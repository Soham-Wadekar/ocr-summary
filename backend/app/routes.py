"""
Navigation endpoints
"""

# Flask imports
from flask import Blueprint, Response, jsonify, request
from flask_bcrypt import check_password_hash
from flask_jwt_extended import create_access_token

# App imports
from app import bcrypt, db
from app.models import User

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
