"""Database Models"""

# Import from app
from app import db


# Default user model
class User(db.Model):
    """User model representing registered users"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        """For user readability"""
        return f"<User {self.username}>"


# TODO: Add your models here
