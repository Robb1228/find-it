
from app import create_app
from app.extensions import socketio
from app.models import db, User
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    db.create_all()
    
    if not User.query.filter_by(email='admin@example.com').first():
        admin = User(
            name='Admin',
            email='admin@example.com',
            password_hash=generate_password_hash('admin'),  # password
            is_admin=True
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin user created.")
    else:
        print("Admin user already exists.")

if __name__ == "__main__":
    socketio.run(app, debug=True)
