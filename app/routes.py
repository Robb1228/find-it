
from flask import Blueprint, render_template, request, flash, redirect, url_for, session

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    return render_template('index.html')

@routes.route('/login')
def login():
    return "Login Page Placeholder"

@routes.route('/register')
def register():
    return "Register Page Placeholder"
