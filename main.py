from flask import Flask, render_template, request, url_for, flash
from flask_sqlalchemy import SQLAlchemy
import smtplib
import os
from dotenv import load_dotenv
from twilio.rest import Client

dotenv_path = "C:/Users/munen/OneDrive/Documents/ffinance/new.txt"
load_dotenv(dotenv_path)


account_sid = os.environ.get('account_sid')
auth_token = os.environ.get('auth_token')
client = Client(account_sid, auth_token)


def send_text(name, email, number, quote):
    body = f"You got a new message from {name}\nPhone number:{number}\nEmail:{email}\nMessage:{quote}"
    message = client.messages.create(
        from_=os.environ.get('twilio'),
        to=os.environ.get('me'),
        body=body
    )
    print(message.sid)


app = Flask(__name__)

app.config['GOOGLEMAPS_KEY'] = os.getenv("google_key")
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", "sqlite:///posts.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()
db.init_app(app)


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


@app.route("/contact_us", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        number = request.form["number"]
        message = request.form["message"]
        # send_text(name=name, email=email, number=number, quote=message)
        # if email != "":
        #     flash("Your message has been sent. Thank you!")
        print(email)
    return render_template("contact.html")


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


@app.route("/guaranteed_lifetime_income_rider")
def income_rider():
    return render_template("GLIR.html")


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
