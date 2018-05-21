from flask import abort, Flask, Blueprint, jsonify, render_template, request, url_for
from flask_restful import reqparse
from mongoengine import connect
from statistics import mean

from .database import *

analytics = Blueprint("analytics", __name__, url_prefix="/analytics")

@analytics.route("/genrequality", methods=["GET"])
def average_rating_genres():
    parser = reqparse.RequestParser()
    parser.add_argument("year", type=int)
    args = parser.parse_args()
    year = args.get("year")

    if year:
        anime_data = [(anime['genre'], anime['rating']) for anime in get_anime_data()\
                if anime['start_date'].year == year ]
        movie_data = [(movie['genre'], movie['rating']) for movie in get_movie_data()\
                if movie['year'] == year]
    else:
        anime_data = [(anime['genre'], anime['rating']) for anime in get_anime_data()]
        movie_data = [(movie['genre'], movie['rating']) for movie in get_movie_data()]

    book_data = []
    for book in get_book_data():
        if book['genre'] == "Undefined":
            continue
        if "Nyt:" in ''.join(book['genre']):
            continue
        book_data.append((map(str.capitalize, book['genre']), book['rating']))

    ratings = {}
    averages = {}

    # for data in anime_data + movie_data + book_data:
    for data in anime_data + movie_data + book_data:
        for genre in data[0]:
            if genre not in ratings:
                ratings[genre] = [data[1]]
            else:
                ratings[genre].append(data[1])

    for genre in ratings:
        averages[genre] = mean(ratings[genre])

    return jsonify(averages), 200

@analytics.route("/genrequality/<string:genre>", methods=["GET"])
def average_rating_genre(genre):
    anime_data = Animes.objects(genre__contains=genre.capitalize())
    movie_data = Movies.objects(genre__contains=genre.capitalize())

    if not anime_data and not movie_data:
        abort(404, "Invalid genre")

    anime_ratings = [anime.rating for anime in anime_data]
    movie_ratings = [movie.rating for movie in movie_data]
    average = mean(anime_ratings + movie_ratings)

    return jsonify({genre:{"average":average}}), 200


# Production and quality analytics
@analytics.route('/productionquality', methods=['GET'])
def production_and_quality():
    parser = reqparse.RequestParser()
    parser.add_argument('genre', type=str)
    parser.add_argument('year', type=int)
    parser.add_argument('year_start', type=int)
    parser.add_argument('year_end', type=int)
    args = parser.parse_args()
    genre = args.get('genre')
    year = args.get('year')
    year_start = args.get('year_start')
    year_end = args.get('year_end')
    anime_results = get_anime_data()
    book_results = get_book_data()
    movie_results = get_movie_data()
    if genre:
        anime_results = [anime for anime in anime_results if genre in anime['genre']]
        book_results = [book for book in book_results if genre in book['genre']]
        movie_results = [movie for movie in movie_results if genre in movie['genre']]

    # Analytics for how many are produced each year
    if year:
        anime_results = [anime for anime in anime_results if int(anime['start_date'].strftime('%Y')) == year]
        book_results = [book for book in book_results if year == book['year']]
        movie_results = [movie for movie in movie_results if year == movie['year']]
        results = dict()
        results['Number of animes'] = len(anime_results)
        results['Number of movies'] = len(movie_results)
        results['Number of books'] = len(book_results)
        results['Average rating of animes'] = mean([anime['rating'] for anime in anime_results]) if anime_results else 0
        results['Average rating of books'] = mean([book['rating'] for book in book_results]) if book_results else 0
        results['Average rating of movies'] = mean([movie['rating'] for movie in movie_results]) if movie_results else 0
        return jsonify(results), 200

    if year_start and year_end and year_start <= year_end:
        results = dict()
        for yr in range(year_start, year_end+1):
            ani_results = [anime for anime in anime_results if int(anime['start_date'].strftime('%Y')) == yr]
            bk_results = [book for book in book_results if yr == book['year']]
            mv_results = [movie for movie in movie_results if yr == movie['year']]
            result = dict()
            result['Number of animes'] = len(ani_results)
            result['Number of movies'] = len(mv_results)
            result['Number of books'] = len(bk_results)
            result['Average rating of animes'] = mean([anime['rating'] for anime in ani_results]) if ani_results else 0
            result['Average rating of books'] = mean([book['rating'] for book in bk_results]) if bk_results else 0
            result['Average rating of movies'] = mean([movie['rating'] for movie in mv_results]) if mv_results else 0
            results[yr] = result
        return jsonify(results), 200
    return jsonify(message='invalid request'), 400


if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(analytics)
    app.run(debug=True)
