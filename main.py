import requests
from flask import Flask, render_template, request, url_for, flash, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
import smtplib
import os
from dotenv import load_dotenv
from twilio.rest import Client
import json
import aiohttp
import asyncio
from flask_mail import Mail, Message
from google import genai
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

key = os.getenv("GEMINI")
client = genai.Client(api_key=key)
# response = client.models.generate_content(
#     model="gemini-2.0-flash", contents="Explain how AI works"
# )
# print(response.text)
# dotenv_path = "C:/Users/User/OneDrive/Documents/ffinance/f.txt"
# load_dotenv(dotenv_path)

account_sid = os.getenv('account_sid')
auth_token = os.getenv('auth_token')
print(account_sid)


# client = Client(account_sid, auth_token)


async def send_message(data):
    headers = {
        "Content-type": "application/json",
        "Authorization": f"Bearer {app.config['ACCESS_TOKEN']}",
    }

    async with aiohttp.ClientSession() as session:
        url = 'https://graph.facebook.com' + f"/{app.config['VERSION']}/{app.config['PHONE_NUMBER_ID']}/messages"
        try:
            async with session.post(url, data=data, headers=headers) as response:
                if response.status == 200:
                    print("Status:", response.status)
                    print("Content-type:", response.headers['content-type'])

                    html = await response.text()
                    print("Body:", html)
                else:
                    print(response.status)
                    print(response)
        except aiohttp.ClientConnectorError as e:
            print('Connection Error', str(e))


def get_text_message_input(recipient, text):
    return json.dumps({
        "messaging_product": "whatsapp",
        "preview_url": False,
        "recipient_type": "individual",
        "to": recipient,
        "type": "text",
        "text": {
            "body": text
        }
    })


# def send_text(name, email, number, quote):
#     body = f"You got a new message from {name}\nPhone number:{number}\nEmail:{email}\nMessage:{quote}"
#     message = client.messages.create(
#         from_=os.getenv('twilio'),
#         to=os.getenv('me'),
#         body=body
#     )
#     print(message.sid)


app = Flask(__name__)
CORS(app)

app.config['GOOGLEMAPS_KEY'] = os.getenv("google_key")
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", "sqlite:///posts.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SECURITY_PASSWORD_SALT"] = os.getenv("SALT")
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_USERNAME'] = os.getenv("USERN")
app.config['MAIL_PASSWORD'] = os.getenv("GMAIL")
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 280}
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

db = SQLAlchemy()
db.init_app(app)
mail = Mail(app)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["10 per minute", "100 per day", "50 per hour"],
    storage_uri="memory://",
)

MAX_MESSAGE_LENGTH = 1000

# with open('config.json') as f:
#     config = json.load(f)

# app.config.update(config)


def send_email(subject, template):
    msg = Message(
        subject,
        recipients=["gambikimathi@gmail.com"],
        body=template,
        sender=app.config['MAIL_USERNAME']
    )
    mail.send(msg)


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    video_url = db.Column(db.String(250), unique=True, nullable=False)
    date = db.Column(db.String(250), nullable=False)
    body = db.Column(db.Text, nullable=True)
    img_url = db.Column(db.String(250), nullable=False, unique=True)


@app.route("/")
def home():
    videos = db.session.query(Posts).all()
    return render_template("index.html", videos=videos)


@app.route('/welcome', methods=['GET', 'POST'])
async def welcome():
    data = get_text_message_input(app.config['RECIPIENT_WAID'],
                                  'Welcome to the Flight Confirmation Demo App for Python!')
    await send_message(data)
    return redirect(url_for('home'))


@app.route("/devin")
def add():
    videos = db.session.query(Posts).all()
    video = []
    for row in videos:
        dicty = {'img_url': row.img_url, 'video_url': row.video_url, 'body': row.body, 'title': row.title}
        video.append(dicty)
    print(len(video))
    return video


@app.route("/contact_us", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        number = request.form["number"]
        message = request.form["message"]
        subject = f"Call request by {name}"
        template = f"{message}\n\nPhone:{number}\n email:{email}"
        # send_text(name=name, email=email, number=number, quote=message)
        # if email != "":
        #     flash("Your message has been sent. Thank you!")
        send_email(subject=subject, template=template)
        print(email)
    return render_template("contact.html")


@app.route('/chat', methods=['POST'])
@limiter.limit("10/minute", override_defaults=False)
def handle_chat():
    try:
        data = request.json
        user_message: object = data.get('message')

        if len(user_message) > MAX_MESSAGE_LENGTH:
            return jsonify({'error': 'Message too long'})

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Send to Gemini
        response = client.models.generate_content(model="gemini-2.0-flash", contents=user_message)

        return jsonify({
            'response': response.text
        })

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


@app.route("/mservices")
def services():
    return render_template("services.html")


@app.route("/mportfolio")
def portfolio():
    return render_template("portfolio.html")


@app.route("/about_us")
def about():
    return render_template("about.html")


@app.route("/life_insurance")
def life_insurance():
    return render_template("life-insurance.html")


@app.route("/retirement-benefits")
def retirement_benefits():
    return render_template("retirement-benefits.html")


@app.route("/living-benefits")
def living_benefits():
    return render_template("living-benefits.html")


@app.route("/medical-cover")
def medical_cover():
    return render_template("medical.html")


@app.route("/dental-cover")
def dental_cover():
    return render_template("dental.html")


@app.route("/disability-cover")
def disability_cover():
    return render_template("disability-insurance.html")


@app.route("/long-term")
def long_term():
    return render_template("longterm-care.html")


@app.route("/IRA")
def ira():
    return render_template("ira.html")


@app.route("/college_funding")
def college():
    return render_template("college.html")


@app.route("/annuity")
def annuity():
    return render_template("annuities.html")


@app.route("/business_continuation")
def business_continuation():
    return render_template("business-continuation.html")


@app.route("/business_transition")
def business_transition():
    return render_template("business-transition.html")


@app.route("/key_employee_insurance_plans")
def key_plans():
    return render_template("key-employee.html")


@app.route("/qualified_plans")
def income_rider():
    return render_template("qualified.html")


@app.route("/executive_bonus_plans")
def executive():
    return render_template("executive.html")


@app.route("/mblog")
def blog():
    return render_template("blog.html")


@app.route("/team")
def team():
    return render_template("team.html")


@app.route("/FAQs")
def faqs():
    return render_template("FAQS.html")


@app.route("/pricing")
def pricing():
    return render_template("pricing.html")


@app.route("/testimonial")
def testimonials():
    return render_template("testimonials.html")


@app.route("/blog_single")
def blog_single():
    return render_template("blog-single.html")


@app.route("/portfolio_det")
def portfolio_details():
    return render_template("portfolio-details.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
