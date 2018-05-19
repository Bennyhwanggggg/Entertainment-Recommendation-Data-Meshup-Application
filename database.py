from mongoengine import StringField, IntField, Document, FloatField, connect
import data_extraction
import requests
import json

connect(host='mongodb://comp9321:comp9321@ds225840.mlab.com:25840/data')

class Animes(Document):
    name = StringField(required=True, primary_key=True)
    genre = StringField(required=True)
    type = StringField(required=True)
    rating = FloatField(required=True)
    episodes = IntField(required=True)

    def __init__(self, name, genre, type, episodes, rating, *args, **values):
        super().__init__(*args, **values)
        self.name = name
        self.genre = genre
        self.type = type
        self.rating = rating
        self.episodes = episodes

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

    def __init__(self, title, author, rating, isbn, isbn13, year, imgurl, smallimgurl, genre, *args, **values):
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
            results.append(result)
        except:
            continue
    return results

def dataimport():
    print('importing book data....', end='')
    bookdata = data_extraction.extract_book_data2()
    for data in bookdata:
        response = requests.get('https://openlibrary.org/api/books?bibkeys=ISBN:{}&jscmd=data&format=json'.format(data['isbn']))
        json_data = json.loads(response.text)
        header = 'ISBN:{}'.format(data['isbn'])
        try:
            subjects = json_data[header]['subjects']
            genres = []
            for subject in subjects:
                genres.append(subject['name'])
            genres = ', '.join(genres)
        except:
            genres = 'Undefined'
        data['genre'] = genres
        try:
            data['isbn'] = float(data['isbn'])
            print(data)
            Books(data['title'], data['authors'], data['average_rating'],
                data['isbn'], data['isbn13'], data['original_publication_year'], data['image_url'], data['small_image_url'], data['genre']).save()
        except:
            continue
    print('done!')

    print('importing movie data....', end='')
    moviedata = data_extraction.extract_movie_data()
    for data in moviedata:
        try:
            Movies(data['Title'], data['Genre'], data['Description'],
                data['Director'], data['Actors'], data['Year'],
                data['Runtime (Minutes)'], data['Rating'],
                data['Revenue (Millions)'], data['Metascore']).save()
        except:
            continue
    print('done!')

    print('importing anime data....', end='')
    animedata = data_extraction.extract_anime_data()
    for data in animedata:
        try:
            Animes(data['name'], data['genre'], data['type'], data['episodes'],
                    data['rating']).save()
        except:
            continue
    print('done!')

