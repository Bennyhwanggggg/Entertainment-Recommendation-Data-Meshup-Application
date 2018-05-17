from database import Animes, Movies, Books
from flask import Flask, jsonify, render_template, request, url_for
from flask_restful import reqparse
from mongoengine import connect

app = Flask(__name__)

connect(host='mongodb://comp9321:comp9321@ds225840.mlab.com:25840/data')

@app.route('/animes', methods=['GET'])
def get_animes():
    parser = reqparse.RequestParser()
    parser.add_argument('order', type=str)
    parser.add_argument('genre', type=str)
    parser.add_argument('title', type=str)
    parser.add_argument('rate_start', type=float)
    parser.add_argument('rate_end', type=float)
    args = parser.parse_args()
    order = args.get('order')
    genre = args.get('genre')
    rate_start = args.get('rate_start')
    rate_end = args.get('rate_end')
    title = args.get('title')
    anime_data = [anime for anime in Animes.objects]
    results = []
    for data in anime_data:
        result = dict()
        result['title'] = data.name
        result['genre'] = data.genre.split(', ')
        result['type'] = data.type
        result['rating'] = data.rating
        result['episodes'] = data.episodes
        results.append(result)

    # if getting by genre
    if genre:
        results = [d for d in results if genre in d.get('genre')]
    # if getting by rating
    if rate_start is not None and rate_end is not None:
        results = [d for d in results if rate_start <= d.get('rating') <= rate_end]
    # if getting by title
    if title:
        results = [d for d in results if title in d.get('title')]

    # if sort from high to low
    if order:
        if order == 'high_to_low':
            results = sorted(results, key=lambda k: k['rating'], reverse=True)
        elif order == 'low_to_high':
            results = sorted(results, key=lambda k: k['rating'])

    return jsonify(results), 200


@app.route('/movies', methods=['GET'])
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
    args = parser.parse_args()
    order = args.get('order')
    genre = args.get('genre')
    year = args.get('year')
    rate_start = args.get('rate_start')
    rate_end = args.get('rate_end')
    title = args.get('title')
    revenue_start = args.get('revenue_start')
    revenue_end = args.get('revenue_end')
    movie_data = [movie for movie in Movies.objects]
    results = []
    for data in movie_data:
        result = dict()
        result['title'] = data.title
        result['genre'] = data.genre.split(',')
        result['rating'] = data.rating
        result['revenue'] = data.revenue
        result['runtime'] = data.runtime
        result['metascore'] = data.metascore
        result['description'] = data.description
        result['director'] = data.director
        result['year'] = data.years
        result['actors'] = data.actors.split(', ')
        results.append(result)

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
    if revenue_start is not None and revenue_end is not None and not year:
        results = [d for d in results if revenue_start <= d.get('revenue') <= revenue_end]
    if year:
        results = [d for d in results if year == d.get('year')]

    # if sort from high to low
    if order:
        if order == 'high_to_low':
            results = sorted(results, key=lambda k: k['rating'], reverse=True)
        elif order == 'low_to_high':
            results = sorted(results, key=lambda k: k['rating'])
    return jsonify(results), 200


@app.route('/books', methods=['GET'])
def get_books():
    parser = reqparse.RequestParser()
    parser.add_argument('order', type=str)
    parser.add_argument('title', type=str)
    parser.add_argument('author', type=str)
    parser.add_argument('rate_start', type=float)
    parser.add_argument('rate_end', type=float)
    args = parser.parse_args()
    order = args.get('order')
    rate_start = args.get('rate_start')
    rate_end = args.get('rate_end')
    title = args.get('title')
    author = args.get('author')
    book_data = [book for book in Books.objects]
    results = []
    for data in book_data:
        result = dict()
        result['title'] = data.title
        result['author'] = data.author
        result['review'] = data.review
        result['rating'] = data.rating
        results.append(result)

    # if getting by rating
    if rate_start is not None and rate_end is not None:
        results = [d for d in results if rate_start <= d.get('rating') <= rate_end]
    # if getting by title
    if title:
        results = [d for d in results if title in d.get('title')]
    # filter by revenue
    if author:
        results = [d for d in results if author in d.get('author')]
    # if sort from high to low
    if order:
        if order == 'high_to_low':
            results = sorted(results, key=lambda k: k['rating'], reverse=True)
        elif order == 'low_to_high':
            results = sorted(results, key=lambda k: k['rating'])
    return jsonify(results), 200


if __name__ == "__main__":
    app.run()