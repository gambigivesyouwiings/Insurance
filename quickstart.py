import requests
from main import app, db, Posts
import sqlalchemy
import os

key = os.environ.get("API")

try:
    request = requests.get(f"https://www.googleapis.com/youtube/v3/search?key={key}&channelId=UCqliVFoKxKlqiAII23CPW1A&part=snippet,id&order=date&maxResults=20")
except requests.exceptions.ConnectionError:
    print("no connecction")
    response = []

else:
    response = request.json()

    for i in response["items"][:-1]:
        print(i["snippet"]["title"])
        print(i["snippet"]["description"])
        print(i["snippet"]["publishedAt"])
        print(i["snippet"]["thumbnails"]["default"]["url"])
        print(i["snippet"]["thumbnails"]["medium"]["url"])
        print(i["snippet"]["thumbnails"]["high"]["url"])
        print(i["id"]["videoId"])
        print("\n")


def clear_db():
    with app.app_context():
        db.drop_all()
        db.create_all()
        db.session.commit()


def fill_db():
    with app.app_context():
        try:
            if response is not []:
                # noinspection PyTypeChecker
                for i in response["items"][:-1]:
                    try:
                        post = Posts(title=i["snippet"]["title"], video_url=i["id"]["videoId"], date=i["snippet"]["publishedAt"],
                             body=i["snippet"]["description"], img_url=i["snippet"]["thumbnails"]["high"]["url"])
                        db.session.add(post)
                        db.session.commit()
                    except sqlalchemy.exc.IntegrityError:
                        print("Data already exists")
                    except sqlalchemy.exc.PendingRollbackError:
                        print("Data already exists")
                    else:
                        continue
        except sqlalchemy.exc.OperationalError:
            db.create_all()

# clear_db()
# fill_db()
