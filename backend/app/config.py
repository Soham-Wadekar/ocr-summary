"""Flask Components Configuration"""

# Imports
import os


class Config:
    """Configuration Class"""

    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    UPLOADS_FOLDER = os.path.join(BASE_DIR, "uploads")

    BASE_ROUTE = "/api"

    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    SECRET_KEY = os.environ.get("SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
