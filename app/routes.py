
from flask import Blueprint, render_template, redirect, url_for, flash, session
from .forms import LoginForm, RegisterForm, ItemForm
from .models import db, User, Item
from werkzeug.security import generate_password_hash, check_password_hash

routes = Blueprint("routes", __name__)

@routes.route("/")
def home():
    return render_template("index.html")

@routes.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password_hash, form.password.data):
            session["user_id"] = user.user_id
            session["user_name"] = user.name
            flash("Login successful!", "success")
            return redirect(url_for("routes.home"))
        flash("Invalid credentials", "danger")
    return render_template("login.html", form=form)

@routes.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        existing_user = User.query.filter_by(email=form.email.data).first()
        if existing_user:
            flash("Email already registered.", "warning")
            return redirect(url_for("routes.login"))
        new_user = User(
            name=form.name.data,
            email=form.email.data,
            password_hash=generate_password_hash(form.password.data)
        )
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful. Please log in.", "success")
        return redirect(url_for("routes.login"))
    return render_template("register.html", form=form)

@routes.route("/logout")
def logout():
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for('routes.index'))

@routes.route("/report", methods=["GET", "POST"])
def report_item():
    form = ItemForm()
    if form.validate_on_submit():
        new_item = Item(
            title=form.title.data,
            description=form.description.data,
            item_type=form.item_type.data,
            date_reported=form.date_reported.data,
            location=form.location.data,
            user_id=session.get("user_id")
        )
        db.session.add(new_item)
        db.session.commit()
        flash("Item reported successfully!", "success")
        return redirect(url_for("routes.view_items"))
    return render_template("report.html", form=form)

@routes.route("/items")
def view_items():
    items = Item.query.order_by(Item.date_reported.desc()).all()
    return render_template("items.html", items=items)

@routes.route("/")
def index():
    return render_template("index.html")

