from flask import abort, Flask, Blueprint, jsonify, render_template, request, url_for
from flask_restful import reqparse
from mongoengine import connect
from statistics import mean

from .database import *

analytics = Blueprint("analytics", __name__, url_prefix="/analytics")


'''
TODO: Add revenue data and change to i
'''
@analytics.route("/genrequality", methods=["GET"])
def average_rating_genres():
    parser = reqparse.RequestParser()
    parser.add_argument("year", type=int)
    parser.add_argument("order", type=str)
    parser.add_argument("count", type=int)
    parser.add_argument("earning", type=str)
    args = parser.parse_args()
    year = args.get("year")
    order = args.get("order")
    earning = args.get("earning")
    count = args.get("count") # can only be used if order or earning is used

    if year:
        anime_data = [(anime['genre'], anime['rating'], anime['revenue']) for anime in get_anime_data()\
                if anime['start_date'].year == year ]
        movie_data = [(movie['genre'], movie['rating'], movie['revenue']) for movie in get_movie_data()\
                if movie['year'] == year]
    else:
        anime_data = [(anime['genre'], anime['rating'], anime['revenue']) for anime in get_anime_data()]
        movie_data = [(movie['genre'], movie['rating'], movie['revenue']) for movie in get_movie_data()]

    book_data = []
    for book in get_book_data():
        if book['genre'] == "Undefined":
            continue
        if "Nyt:" in ''.join(book['genre']):
            continue
        if year and book['year'] != year:
            continue
        book_data.append((map(str.capitalize, book['genre']), book['rating'], book['revenue']))

    ratings = {}
    averages = {}
    revenues = {}
    average_earning = {}
    # for data in anime_data + movie_data + book_data:
    for data in anime_data + movie_data + book_data:
        for genre in data[0]:
            if genre not in ratings:
                ratings[genre] = [data[1]]
            else:
                ratings[genre].append(data[1])
            if genre not in revenues:
                revenues[genre] = [data[2]]
            else:
                revenues[genre].append(data[2])

    for genre in ratings:
        averages[genre] = mean(ratings[genre])

    for genre in revenues:
        average_earning[genre] = mean(revenues[genre])

    results = []
    for key, val in averages.items():
        result = dict()
        result['genre'] = key
        result['average_rating'] = val
        result['average_revenue'] = average_earning[key]
        results.append(result)

    if order:
        if order == 'high_to_low' and results:
            results = sorted(results, key=lambda k: k['average_rating'], reverse=True)
        if order == 'low_to_high' and results:
            results = sorted(results, key=lambda k: k['average_rating'])
    if earning:
        if earning == 'highest' and results:
            results = sorted(results, key=lambda k: k['average_revenue'], reverse=True)
        if earning == 'lowest' and results:
            results = sorted(results, key=lambda k: k['average_revenue'])
    if count and results and count > len(results):
        results = results[:count]
    return jsonify(results), 200

@analytics.route("/genrequality/<string:genre>", methods=["GET"])
def average_rating_genre(genre):
    anime_data = Animes.objects(genre__contains=genre.capitalize())
    movie_data = Movies.objects(genre__contains=genre.capitalize())
    book_data = Books.objects(genre__contains=genre.capitalize())
    if not anime_data and not movie_data and not book_data:
        abort(404, "Invalid genre")

    anime_ratings = [anime.rating for anime in anime_data] if anime_data else []
    movie_ratings = [movie.rating for movie in movie_data] if movie_data else []
    book_rating = [book.rating for book in book_data] if book_data else []
    average_rating = mean(anime_ratings + movie_ratings + book_rating)
    anime_rev_ratings = [anime.revenue for anime in anime_data] if anime_data else []
    movie_rev_ratings = [movie.revenue for movie in movie_data] if movie_data else []
    book_rev_rating = [book.revenue for book in book_data] if book_data else []
    average_revenue = mean(anime_rev_ratings + movie_rev_ratings + book_rev_rating)
    return jsonify({genre:{"average_rating": average_rating, "average_revenue": average_revenue}}), 200


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
        results['Number_of_animes'] = len(anime_results)
        results['Number_of_movies'] = len(movie_results)
        results['Number_of_books'] = len(book_results)
        results['Average_rating_of_animes'] = mean([anime['rating'] for anime in anime_results]) if anime_results else 0
        results['Average_earning_of_animes'] = mean([anime['revenue'] for anime in anime_results]) if anime_results else 0
        results['Average_rating_of_books'] = mean([book['rating'] for book in book_results]) if book_results else 0
        results['Average_earning_of_books'] = mean([book['revenue'] for book in book_results]) if book_results else 0
        results['Average_rating_of_movies'] = mean([movie['rating'] for movie in movie_results]) if movie_results else 0
        results['Average_earning_of_movies'] = mean([movie['revenue'] for movie in movie_results]) if movie_results else 0
        return jsonify(results), 200

    if year_start and year_end and year_start <= year_end:
        results = dict()
        for yr in range(year_start, year_end+1):
            ani_results = [anime for anime in anime_results if int(anime['start_date'].strftime('%Y')) == yr]
            bk_results = [book for book in book_results if yr == book['year']]
            mv_results = [movie for movie in movie_results if yr == movie['year']]
            result = dict()
            result['Number_of_animes'] = len(ani_results)
            result['Number_of_movies'] = len(mv_results)
            result['Number_of_books'] = len(bk_results)
            result['Average_rating_of_animes'] = mean([anime['rating'] for anime in ani_results]) if ani_results else 0
            result['Average_earning_of_animes'] = mean([anime['revenue'] for anime in ani_results]) if ani_results else 0
            result['Average_rating_of_books'] = mean([book['rating'] for book in bk_results]) if bk_results else 0
            result['Average_earning_of_books'] = mean([book['revenue'] for book in bk_results]) if bk_results else 0
            result['Average_rating_of_movies'] = mean([movie['rating'] for movie in mv_results]) if mv_results else 0
            result['Average_earning_of_movies'] = mean([movie['revenue'] for movie in mv_results]) if mv_results else 0
            results[yr] = result
        return jsonify(results), 200
    return jsonify(message='invalid request'), 400

@analytics.route('/productiontrend', methods=['GET'])#get the trend from start year to end year
def production_and_trend():
    parser = reqparse.RequestParser()
    parser.add_argument('genre', type=str)
    parser.add_argument('year_start', type=int)
    parser.add_argument('year_end', type=int)
    args = parser.parse_args()
    genre = args.get('genre')
    year_start = args.get('year_start')
    year_end = args.get('year_end')
    anime_results = get_anime_data()
    book_results = get_book_data()
    movie_results = get_movie_data()
    if genre:
        anime_results = [anime for anime in anime_results if genre in anime['genre']]
        book_results = [book for book in book_results if genre in book['genre']]
        movie_results = [movie for movie in movie_results if genre in movie['genre']]

    if year_start and year_end and year_start <= year_end:
        results = dict()
        s = []
        s.append(['Year', 'Animes', 'Movies', 'Books'])
        for yr in range(year_start, year_end+1):
            ani_results = [anime for anime in anime_results if int(anime['start_date'].strftime('%Y')) == yr]
            bk_results = [book for book in book_results if yr == book['year']]
            mv_results = [movie for movie in movie_results if yr == movie['year']]
            a = mean([anime['rating'] for anime in ani_results]) if ani_results else 0
            c= mean([book['rating'] for book in bk_results]) if bk_results else 0
            b= mean([movie['rating'] for movie in mv_results]) if mv_results else 0
            s.append([yr,a,b,c])
        results['data'] = s
        return jsonify(results), 200
    return jsonify(message='invalid request'), 400

@analytics.route('/productionrevenue', methods=['GET'])#get the revenue info from start year to end year
def production_and_revenue():
    parser = reqparse.RequestParser()
    # parser.add_argument('genre', type=str)
    parser.add_argument('year_start', type=int)
    parser.add_argument('year_end', type=int)
    args = parser.parse_args()
    # genre = args.get('genre')
    year_start = args.get('year_start')
    year_end = args.get('year_end')
    anime_results = get_anime_data()
    book_results = get_book_data()
    movie_results = get_movie_data()
    # if genre:
    #     anime_results = [anime for anime in anime_results if genre in anime['genre']]
    #     book_results = [book for book in book_results if genre in book['genre']]
    #     movie_results = [movie for movie in movie_results if genre in movie['genre']]

    if year_start and year_end and year_start <= year_end:
        results = dict()
        s = []
        s.append(['Year', 'Animes', 'Movies', 'Books'])
        for yr in range(year_start, year_end+1):
            ani_results = [anime for anime in anime_results if int(anime['start_date'].strftime('%Y')) == yr]
            bk_results = [book for book in book_results if yr == book['year']]
            mv_results = [movie for movie in movie_results if yr == movie['year']]
            a = sum([anime['revenue'] for anime in ani_results]) if ani_results else 0
            c = sum([book['revenue'] for book in bk_results]) if bk_results else 0
            b= sum([movie['revenue'] for movie in mv_results]) if mv_results else 0
            s.append([yr,a,b,c])
        results['data'] = s
        return jsonify(results), 200
    return jsonify(message='invalid request'), 400


if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(analytics)
    app.run(debug=True)
