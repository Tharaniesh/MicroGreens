from flask import Flask
from flask import Blueprint,jsonify,request,render_template,redirect,url_for

main_bp = Blueprint('main', __name__, url_prefix='')

@main_bp.route('/')
@main_bp.route('/home')
def home():
    microgreens = [
            {
                "name": "Broccoli Microgreens",
                "description": "Rich in antioxidants & vitamins",
                "image": "place-holder.jpg"
            },
            {
                "name": "Radish Microgreens",
                "description": "Spicy crunch with great nutrition",
                "image": "place-holder.jpg"
            },
            {
                "name": "Pea Shoots",
                "description": "Sweet taste, high protein",
                "image": "place-holder.jpg"
            }
        ]

    return render_template('pages/home.html', microgreens=microgreens)