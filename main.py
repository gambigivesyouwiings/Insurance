import mimetypes

from flask import Flask, render_template, request, url_for, flash
import requests
import json
import smtplib
import os

# from quickstart import GoogleDriveApi


map_api = os.getenv("map_api")
app = Flask(__name__)

app.config['GOOGLEMAPS_KEY'] = os.getenv("google_key")

# drive = GoogleDriveApi()
# f = drive.download_file(real_file_id="1-e_w9p52otiIp5S8onSNB3tnPruDPQFC", path="static")
# print(f)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/contact_us", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        subject = request.form["subject"]
        message = request.form["message"]
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


@app.route("/mblog")
def blog():
    return render_template("blog.html")


@app.route("/team")
def team():
    return render_template("team.html")


@app.route("/price")
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
