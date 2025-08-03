"""
Navigation endpoints
"""

# Flask imports
from flask import Blueprint, Response, jsonify, current_app, request
from flask_bcrypt import check_password_hash
from flask_jwt_extended import create_access_token

# App imports
from app import bcrypt, db
from app.models import User

# File imports
import os
import base64
import mimetypes
from werkzeug.utils import secure_filename

# LangChain imports
from langchain_community.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

routes = Blueprint("routes", __name__)


# ------------------------------ Status Check ------------------------------- #
@routes.route("/", methods=["GET"])
def status_check() -> tuple[Response, int]:
    """
    [METHOD: GET]
    Check status of the server
    """
    try:
        return jsonify({"status": "healthy"}), 200
    except Exception as err:
        return jsonify({"status": "error", "message": f"Internal Server Error: {err}"})


# ------------------------------ Test Database ------------------------------ #
@routes.route("/test-db", methods=["GET"])
def get_tables() -> tuple[Response, int]:
    """
    [METHOD: GET]
    Check status of the server
    """
    from sqlalchemy import inspect

    try:
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
        return jsonify({"tables": tables, "message": "success"})
    except Exception as err:
        return jsonify({"status": "error", "message": f"Database error: {err}"})


# ---------------------------- Test LangChain API ---------------------------- #
@routes.route("/test-llm", methods=["GET"])
def test_llm() -> tuple[Response, int]:
    """
    [METHOD: GET]
    Test connection to OpenAI via LangChain
    """
    try:

        llm = ChatOpenAI(
            model="gpt-4",
            openai_api_key=current_app.config["OPENAI_API_KEY"],
            max_tokens=50,
            temperature=0,
        )

        # Basic test message
        message = [HumanMessage(content="What is the capital of France?")]
        response = llm(message)

        return (
            jsonify(
                {
                    "status": "success",
                    "message": "LLM test successful",
                    "response": response.content,
                }
            ),
            200,
        )

    except Exception as err:
        return jsonify({"status": "error", "message": f"LLM test failed: {err}"}), 500


# --------------------------------- Sign Up --------------------------------- #
@routes.route("/signup", methods=["POST"])
def signup() -> tuple[Response, int]:
    """
    [METHOD: POST]
    Check status of the server
    """
    # Receives data from frontend and extracts it
    data: dict = request.json

    username: str = data.get("username")
    email: str = data.get("email")
    password: str = data.get("password")

    # Check whether email exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists!"}), 409

    # Creates a password hash for secure storage
    hashed_password: str = bcrypt.generate_password_hash(password).decode("utf-8")

    # Adds a new user to the database
    new_user: User = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Creates a token for authorization
    access_token: str = create_access_token(
        identity={"id": new_user.id, "name": new_user.username}
    )

    return (
        jsonify(
            {
                "message": "Sign Up successful!",
                "token": access_token,
                "user": new_user.username,
            }
        ),
        201,
    )


# ------------------------------- Login Route ------------------------------- #
@routes.route("/login", methods=["POST"])
def login() -> tuple[Response, int]:
    """
    [METHOD: POST]
    Validates Login
    """

    # Receives data from frontend and extracts it
    data: dict = request.json

    email: str = data.get("email")
    password: str = data.get("password")

    # Validates if user exists and has the correct email and password
    user: User = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Creates a token for authorization
    access_token: str = create_access_token(
        identity={"id": user.id, "name": user.username}
    )

    return (
        jsonify(
            {
                "message": "Login Successful",
                "token": access_token,
                "user": user.username,
                "id": user.id,
            }
        ),
        201,
    )


# --------------------------- Analyze Images Route -------------------------- #
@routes.route("/analyze", methods=["POST"])
def analyze_images() -> tuple[Response, int]:
    try:
        # 1. Check for files
        if "files" not in request.files:
            return jsonify({"error": "No files part in the request"}), 400

        files = request.files.getlist("files")
        if not files:
            return jsonify({"error": "No files uploaded"}), 400

        results = []
        temp_file_paths = []

        # 2. Process each file
        for file in files:
            if not file.mimetype.startswith("image/"):
                return (
                    jsonify({"error": f"Unsupported file type: {file.filename}"}),
                    400,
                )

            filename = secure_filename(file.filename)
            path = os.path.join(current_app.config["UPLOADS_FOLDER"], filename)
            file.save(path)
            temp_file_paths.append(path)

            # 3. Encode file to base64
            mime_type = mimetypes.guess_type(path)[0] or "image/jpeg"
            with open(path, "rb") as img_file:
                b64_data = base64.b64encode(img_file.read()).decode("utf-8")

            image_input = {
                "type": "image_url",
                "image_url": {"url": f"data:{mime_type};base64,{b64_data}"},
            }

            # 4. Setup LLM
            llm = ChatOpenAI(
                model="gpt-4o",
                openai_api_key=current_app.config["OPENAI_API_KEY"],
                max_tokens=1000,
                temperature=0,
            )

            # 5. Prompt Template
            system_msg = SystemMessage(
                content="You are an antimicrobial stewardship assistant following ICMR guidelines."
            )
            user_prompt = """
You are an antimicrobial stewardship assistant.

You will be shown clinical case images (e.g., patient charts, prescription, lab reports). Based on them, provide structured JSON output as:

{
  "site_of_infection": "...",
  "current_antibiotic_appropriateness": "...",
  "recommended_treatment": {
    "drug": "...",
    "dose": "...",
    "duration": "..."
  },
  "treatment_adjustment": {
    "step_down_or_escalation": "...",
    "alternative_options": ["...", "..."]
  },
  "justification": "..."
}

Use "unknown" for missing fields.
Respond ONLY with a valid JSON object.
"""

            user_message = HumanMessage(
                content=[image_input, {"type": "text", "text": user_prompt}]
            )

            # 6. Get Response
            response = llm([system_msg, user_message])
            results.append(
                {
                    "filename": filename,
                    "result": response.content,
                }
            )

        # 7. Optional: Cleanup
        for path in temp_file_paths:
            try:
                os.remove(path)
            except Exception as e:
                print(f"Error deleting file {path}: {e}")

        return jsonify(results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
