
from flask import Flask
from .routes import routes
from .models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    app.secret_key = 'supersecretkey'

    db.init_app(app)
    app.register_blueprint(routes)

    return app
