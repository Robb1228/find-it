
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))
    items = db.relationship("Item", backref="owner", lazy=True)
    is_admin = db.Column(db.Boolean, default=False)

class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    item_type = db.Column(db.String(10))  # "lost" or "found"
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    date_reported = db.Column(db.DateTime)
    location = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))
    contact_info = db.Column(db.String(100))

