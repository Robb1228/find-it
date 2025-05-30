
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(10), default='user')

    items = db.relationship('Item', backref='user', lazy=True)

class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    date_reported = db.Column(db.Date, nullable=False)
    location = db.Column(db.String(100))
    image_url = db.Column(db.String(255))
    status = db.Column(db.String(20), default='lost')
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
