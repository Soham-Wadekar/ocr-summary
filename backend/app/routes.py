"""
Navigation endpoints
"""

# Flask imports
from flask import Blueprint, Response, jsonify

# App imports
from app import db

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
