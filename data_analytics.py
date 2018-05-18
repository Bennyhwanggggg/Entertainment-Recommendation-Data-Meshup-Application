from database import Animes, Movies, Books, get_anime_data, get_movie_data, get_book_data
from flask import abort, Flask, Blueprint, jsonify, render_template, request, url_for
from flask_restful import reqparse
from mongoengine import connect
from statistics import mean

analytics = Blueprint("analytics", __name__, url_prefix="/analytics")

connect(host='mongodb://comp9321:comp9321@ds225840.mlab.com:25840/data')

@analytics.route("/rating/average/genre", methods=["GET"])
def average_rating_genres():
    anime_data = [(anime['genre'], anime['rating']) for anime in get_anime_data()]
    movie_data = [(movie['genre'], movie['rating']) for movie in get_movie_data()]

    ratings = {}
    averages = {}

    for data in anime_data:
        for genre in data[0]:
            if genre not in ratings:
                ratings[genre] = [data[1]]
            else:
                ratings[genre].append(data[1])

    for data in movie_data:
        for genre in data[0]:
            if genre not in ratings:
                ratings[genre] = [data[1]]
            else:
                ratings[genre].append(data[1])

    for genre in ratings:
        averages[genre] = mean(ratings[genre])

    return jsonify(averages), 200

@analytics.route("/rating/average/genre/<string:genre>", methods=["GET"])
def average_rating_genre(genre):
    anime_data = Animes.objects(genre__contains=genre.capitalize())
    movie_data = Movies.objects(genre__contains=genre.capitalize())

    if not anime_data and not movie_data:
        abort(404, "Invalid genre")

    anime_ratings = [anime.rating for anime in anime_data]
    movie_ratings = [movie.rating for movie in movie_data]
    average = mean(anime_ratings + movie_ratings)

    return jsonify({genre:{"average":average}}), 200

if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(analytics)
    app.run(debug=True)
