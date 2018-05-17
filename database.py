from mongoengine import StringField, IntField,Document, FloatField, connect
import data_extraction

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

    def __init__(self, title, genre, description, director, actors, years, runtime, rating, revenue, metascore, *args, **values):
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
    review = StringField()

    def __init__(self, title, author, rating, review, *args, **values):
        super().__init__(*args, **values)
        self.title = title
        self.author = author
        self.rating = rating
        self.review = review


def dataimport():

    print('importing book data....', end='')
    connect(host='mongodb://comp9321:comp9321@ds225010.mlab.com:25010/books')
    bookdata = data_extraction.get_book_data()
    for data in bookdata:
        Books(data['title'], data['author'], data['rating'], data['review']).save()
    print('done!')
    print('importing movie data....', end='')
    connect(host='mongodb://comp9321:comp9321@ds225010.mlab.com:25010/movies')
    moviedata = data_extraction.get_movie_data()
    for data in moviedata:
        Movies(data['Title'], data['Genre'], data['Description'], data['Director'], data['Actors'], data['Year'],
               data['Runtime (Minutes)'], data['Rating'], data['Revenue (Millions)'], data['Metascore']).save()
    print('done!')
    print('importing anime data....', end='')
    connect(host='mongodb://comp9321:comp9321@ds225010.mlab.com:25010/animes')
    animedata = data_extraction.get_anime_data()
    for data in animedata:
        Animes(data['name'], data['genre'], data['type'], data['episodes'], data['rating']).save()
    print('done!')
