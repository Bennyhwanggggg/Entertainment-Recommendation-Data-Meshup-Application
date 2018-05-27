import requests
import json

from datetime import datetime
from mongoengine import StringField, IntField, Document, FloatField,\
        DateTimeField, connect

connect(host='mongodb://comp9321:comp9321@ds225840.mlab.com:25840/data')

class Animes(Document):
    name = StringField(required=True, primary_key=True)
    genre = StringField(required=True)
    type = StringField(required=True)
    rating = FloatField(required=True)
    episodes = IntField(required=True)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(required=True)
    revenue = FloatField(required=True)

    def __init__(self, name, genre, type, episodes, rating, start_date,\
            end_date, revenue, *args, **values):
        super().__init__(*args, **values)
        self.name = name
        self.genre = genre
        self.type = type
        self.rating = rating
        self.episodes = episodes
        self.start_date = start_date
        self.end_date = end_date
        self.revenue = float(revenue)

class Movies(Document):
    title = StringField(required=True, primary_key=True)
    genre = StringField(required=True)
    description = StringField()
    director = StringField(required=True)
    actors = StringField()
    years = IntField(required=True)
    runtime = IntField(required=True)
    rating = FloatField(required=True)
    revenue = FloatField()
    metascore = IntField(required=True)

    def __init__(self, title, genre, description, director, actors, years,\
            runtime, rating, revenue, metascore, *args, **values):
        super().__init__(*args, **values)
        self.title = title
        self.genre = genre
        self.description = description
        self.director = director
        self.actors = actors
        self.years = years
        self.runtime = runtime
        self.rating = rating
        self.revenue = revenue
        self.metascore = metascore

class Books(Document):
    title = StringField(required=True, primary_key=True)
    author = StringField(required=True)
    rating = FloatField(required=True)
    isbn = FloatField(required=True)
    isbn13 = FloatField(required=True)
    year = IntField(required=True)
    imgurl = StringField(required=True)
    smallimgurl = StringField(required=True)
    genre = StringField(required=True)
    revenue = FloatField(required=True)

    def __init__(self, title, author, rating, isbn, isbn13, year, imgurl, smallimgurl, genre, revenue, *args, **values):
        super().__init__(*args, **values)
        self.title = title
        self.author = author
        self.rating = rating
        self.isbn = isbn
        self.isbn13 = isbn13
        self.year = year
        self.imgurl = imgurl
        self.smallimgurl = smallimgurl
        self.genre = genre
        self.revenue = revenue

def get_anime_data():
    anime_data = [anime for anime in Animes.objects]
    results = []
    for data in anime_data:
        result = dict()
        result['title'] = data.name
        result['genre'] = data.genre.split(', ')
        result['type'] = data.type
        result['rating'] = data.rating
        result['episodes'] = data.episodes
        result['start_date'] = data.start_date
        result['end_date'] = data.end_date
        result['revenue'] = float(data.revenue)
        results.append(result)
    return results

def get_movie_data():
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
    return results

def get_book_data():
    book_data = [book for book in Books.objects]
    results = []
    for data in book_data:
        try:
            result = dict()
            result['title'] = data.title
            result['isbn'] = int(data.isbn)
            result['isbn13'] = data.isbn13
            result['year'] = data.year
            result['author'] = data.author.split(', ')
            result['imgurl'] = data.imgurl
            result['genre'] = data.genre.split(', ')
            result['smallimgurl'] = data.smallimgurl
            result['rating'] = data.rating
            result['revenue'] = float(round(data.revenue, 4))
            results.append(result)
        except:
            continue
    return results
