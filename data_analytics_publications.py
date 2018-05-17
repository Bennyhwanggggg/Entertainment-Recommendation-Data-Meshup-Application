from database import Animes, Movies, Books
from flask import Flask, jsonify, render_template, request, url_for
from flask_restful import reqparse
from mongoengine import connect

app = Flask(__name__)

@app.route('/anime', methods=['GET'])
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
    connect(host='mongodb://comp9321:comp9321@ds225010.mlab.com:25010/animes')
    anime_data = [anime for anime in Animes.objects]
    results = []
    for data in anime_data:
        result = dict()
        result['title'] = data.name
        result['genre'] = data.genre
        result['type'] = data.type
        result['rating'] = data.rating
        result['episodes'] = data.episodes
        results.append(result)
    # if sort from high to low
    if order:
        if order == 'high_to_low':
            results = sorted(results, key=lambda k: k['rating'], reverse=True)
        elif order == 'low_to_high':
            results = sorted(results, key=lambda k: k['rating'])
    # if getting by genre
    if genre:
        results = [d for d in results if genre in d.get('genre').split(', ')]
    # if getting by rating
    if rate_start is not None and rate_end is not None:
        results = [d for d in results if rate_start <= d.get('rating') <= rate_end]
    # if getting by title
    if title:
        results = [d for d in results if title in d.get('title')]
    return jsonify(results), 200



if __name__ == "__main__":
    app.run()