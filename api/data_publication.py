from flask import Flask, Blueprint, jsonify, render_template, request, url_for
from flask_restful import reqparse
from mongoengine import connect

from .database import *

publication = Blueprint("publication", __name__, url_prefix="/show")

@publication.route('/animes', methods=['GET'])
def get_animes():
    parser = reqparse.RequestParser()
    parser.add_argument('order', type=str)
    parser.add_argument('genre', type=str)
    parser.add_argument('title', type=str)
    parser.add_argument('rate_start', type=float)
    parser.add_argument('rate_end', type=float)
    parser.add_argument('count', type=int)
    # parser.add_argument('earning', type=str)
    parser.add_argument('revenue_start', type=float)
    parser.add_argument('revenue_end', type=float)
    args = parser.parse_args()
    order = args.get('order')
    genre = args.get('genre')
    rate_start = args.get('rate_start')
    rate_end = args.get('rate_end')
    title = args.get('title')
    count = args.get('count') # number of results to show
    revenue_start = args.get('revenue_start')
    revenue_end = args.get('revenue_end')
    # earning = args.get('earning')
    results = get_anime_data()

    # if getting by genre
    if genre:
        results = [d for d in results if genre in d.get('genre')]
    # if getting by rating
    if rate_start is not None and rate_end is not None:
        results = [d for d in results if rate_start <= d.get('rating') <= rate_end]
    # if getting by title
    if title:
        results = [d for d in results if title in d.get('title')]
    if revenue_start is not None and revenue_end is not None:
        results = [d for d in results if revenue_start <= d.get('revenue') <= revenue_end]

    # if sort from high to low
    if order:
        if order == 'highest_rating':
            results = sorted(results, key=lambda k: k['rating'], reverse=True)
        elif order == 'lowest_rating':
            results = sorted(results, key=lambda k: k['rating'])
        elif order == 'highest_revenue':
            results = sorted(results, key=lambda k: k['revenue'], reverse=True)
        elif order == 'lowest_revenue':
            results = sorted(results, key=lambda k: k['revenue'])
    if results and count and len(results) > count:
        results = results[:count]
    return jsonify(results), 200

@publication.route("/animes/genre", methods=["GET"])
def get_anime_genres():
    genres = set()

    anime_data = [anime["genre"] for anime in get_anime_data()]
    for data in anime_data:
        for genre in data:
            genres.add(genre)

    return jsonify(list(genres)), 200

@publication.route('/movies', methods=['GET'])
def get_movies():
    parser = reqparse.RequestParser()
    parser.add_argument('order', type=str)
    parser.add_argument('genre', type=str)
    parser.add_argument('title', type=str)
    parser.add_argument('year', type=int)
    parser.add_argument('rate_start', type=float)
    parser.add_argument('rate_end', type=float)
    parser.add_argument('revenue_start', type=float)
    parser.add_argument('revenue_end', type=float)
    parser.add_argument('count', type=int)
    # parser.add_argument('earning', type=str)
    args = parser.parse_args()
    order = args.get('order')
    genre = args.get('genre')
    year = args.get('year')
    rate_start = args.get('rate_start')
    rate_end = args.get('rate_end')
    title = args.get('title')
    revenue_start = args.get('revenue_start')
    revenue_end = args.get('revenue_end')
    # earning = args.get('earning')
    count = args.get('count')  # number of results to show
    results = get_movie_data()
    # if getting by genre
    if genre:
        results = [d for d in results if genre in d.get('genre')]
    # if getting by rating
    if rate_start is not None and rate_end is not None:
        results = [d for d in results if rate_start <= d.get('rating') <= rate_end]
    # if getting by title
    if title:
        results = [d for d in results if title in d.get('title')]
    # filter by revenue
    if revenue_start is not None and revenue_end is not None:
        results = [d for d in results if revenue_start <= d.get('revenue') <= revenue_end]
    if year:
        results = [d for d in results if year == d.get('year')]

    # if sort from high to low
    if order:
        if order == 'highest_rating':
            results = sorted(results, key=lambda k: k['rating'], reverse=True)
        elif order == 'lowest_rating':
            results = sorted(results, key=lambda k: k['rating'])
        elif order == 'highest_revenue':
            results = sorted(results, key=lambda k: k['revenue'], reverse=True)
        elif order == 'lowest_revenue':
            results = sorted(results, key=lambda k: k['revenue'])
    if results and count and len(results) > count:
        results = results[:count]
    return jsonify(results), 200

@publication.route("/movies/genre", methods=["GET"])
def get_movie_genres():
    genres = set()

    movies_data = [movie["genre"] for movie in get_movie_data()]
    for data in movies_data:
        for genre in data:
            genres.add(genre)

    return jsonify(list(genres)), 200

@publication.route('/books', methods=['GET'])
def get_books():
    parser = reqparse.RequestParser()
    parser.add_argument('order', type=str)
    parser.add_argument('title', type=str)
    parser.add_argument('author', type=str)
    parser.add_argument('genre', type=str)
    parser.add_argument('rate_start', type=float)
    parser.add_argument('rate_end', type=float)
    parser.add_argument('year', type=int)
    parser.add_argument('count', type=int)
    # parser.add_argument('earning', type=str)
    parser.add_argument('revenue_start', type=float)
    parser.add_argument('revenue_end', type=float)
    args = parser.parse_args()
    genre = args.get('genre')
    year = args.get('year')
    order = args.get('order')
    rate_start = args.get('rate_start')
    rate_end = args.get('rate_end')
    title = args.get('title')
    author = args.get('author')
    count = args.get('count')  # number of results to show
    # earning = args.get('earning')
    revenue_start = args.get('revenue_start')
    revenue_end = args.get('revenue_end')
    results = get_book_data()
    # if getting by rating
    if rate_start is not None and rate_end is not None:
        results = [d for d in results if rate_start <= d.get('rating') <= rate_end]
    # if getting by title
    if title:
        results = [d for d in results if title in d.get('title')]
    # get by genre
    if genre:
        results = [d for d in results if genre in d.get('genre')]
    # filter by revenue
    if author:
        results = [d for d in results if author in d.get('author')]
    # filter by year
    if year:
        results = [d for d in results if year == d.get('year')]
    if revenue_start is not None and revenue_end is not None:
        results = [d for d in results if revenue_start <= d.get('revenue') <= revenue_end]
    # if sort from high to low
    if order:
        if order == 'highest_rating':
            results = sorted(results, key=lambda k: k['rating'], reverse=True)
        elif order == 'lowest_rating':
            results = sorted(results, key=lambda k: k['rating'])
        elif order == 'highest_revenue':
            results = sorted(results, key=lambda k: k['revenue'], reverse=True)
        elif order == 'lowest_revenue':
            results = sorted(results, key=lambda k: k['revenue'])

    if results and count and len(results) > count:
        results = results[:count]
    return jsonify(results), 200

@publication.route("/books/genre", methods=["GET"])
def get_book_genres():
    genres = set()

    books_data = [book["genre"] for book in get_book_data()]
    for data in books_data:
        for genre in data:
            genres.add(genre)

    return jsonify(list(genres)), 200

@publication.route('/combined', methods=['GET'])
def get_combined():
    parser = reqparse.RequestParser()
    parser.add_argument('order', type=str)
    parser.add_argument('type1', type=str)
    parser.add_argument('type2', type=str)
    parser.add_argument('type3', type=str)
    parser.add_argument('genre', type=str)
    parser.add_argument('rate_start', type=float)
    parser.add_argument('rate_end', type=float)
    parser.add_argument('count', type=int)
    parser.add_argument('year', type=int)
    # parser.add_argument('earning', type=str)
    parser.add_argument('revenue_start', type=float)
    parser.add_argument('revenue_end', type=float)
    args = parser.parse_args()
    order = args.get('order')
    type1 = args.get('type1')
    type2 = args.get('type2')
    type3 = args.get('type3')
    genre = args.get('genre')
    year = args.get('year')
    count = args.get('count')  # number of results to show
    rate_start = args.get('rate_start')
    rate_end = args.get('rate_end')
    # earning = args.get('earning')
    revenue_start = args.get('revenue_start')
    revenue_end = args.get('revenue_end')
    if not type1 and not type2 and not type3:
        return jsonify(msg='No media selection made')
    results = []
    if type1:
        if type1 == 'Movies':
            results.extend(get_movie_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
        elif type1 == 'Animes':
            results.extend(get_anime_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
        elif type1 == 'Books':
            results.extend(get_book_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
    if type1 != type2 and type2:
        if type2 == 'Movies':
            results.extend(get_movie_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
        elif type2 == 'Animes':
            results.extend(get_anime_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
        elif type2 == 'Books':
            results.extend(get_book_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
    if type1 != type2 and type2 != type3 and type3:
        if type3 == 'Movies':
            results.extend(get_movie_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
        elif type3 == 'Animes':
            results.extend(get_anime_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
        elif type3 == 'Books':
            results.extend(get_book_data())
            if genre:
                results = [d for d in results if genre in d.get('genre')]
    if results and rate_start and rate_end:
        results = [d for d in results if rate_start <= d.get('rating') <= rate_end]
    if year:
        results = [d for d in results if year == d.get('year')]
    if revenue_start is not None and revenue_end is not None:
        results = [d for d in results if revenue_start <= d.get('revenue') <= revenue_end]
    # if sort from high to low
    if order:
        if order == 'highest_rating':
            results = sorted(results, key=lambda k: k['rating'], reverse=True)
        elif order == 'lowest_rating':
            results = sorted(results, key=lambda k: k['rating'])
        elif order == 'highest_revenue':
            results = sorted(results, key=lambda k: k['revenue'], reverse=True)
        elif order == 'lowest_revenue':
            results = sorted(results, key=lambda k: k['revenue'])

    if results and count and len(results) > count:
        results = results[:count]
    return jsonify(results), 200

if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(publication)
    app.run(debug=True)
