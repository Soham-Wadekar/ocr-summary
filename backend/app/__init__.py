"""
App initialization
"""

# Flask Imports
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

# Import from app
from app.config import Config

# Initializing necessary components
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app():
    """Creates an application with the given configurations"""
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    from app.routes import routes

    app.register_blueprint(routes, url_prefix=Config.BASE_ROUTE)

    with app.app_context():
        db.create_all()

    return app
