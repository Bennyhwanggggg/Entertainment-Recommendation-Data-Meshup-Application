from mongoengine import StringField, IntField,Document, EmbeddedDocument,ListField, EmbeddedDocumentField

# class Data(EmbeddedDocument):
#     offence = StringField(required=True, max_length=200)
#     type = StringField(required=True, max_length=200)
#
#     def __init__(self, offence, type, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.offence = offence
#         self.type = type

class Anime(Document):
    name = StringField(required=True, max_length=50)
    genre = StringField(required=True, max_length=50)
    type = StringField(required=True, max_length=50)
    rating = FloatingPointError(required=True, max_length=20)

    def __init__(self, name, genre, type, rating, *args, **values):
        super().__init__(*args, **values)
        self.name = name
        self.genre = genre
        self.type = types
        self.rating = rating


class USA_youtube():
    publish_time = StringField(required=True, max_length=50)
    views = StringField(required=True, max_length=50)
    likes = StringField(required=True, max_length=50)
    dislikes = StringField(required=True, max_length=50)

    def __init__(self, publish_time, views, likes, dislikes, *args, **values):
        self.publish_time = publish_time
        self.views = views
        self.likes = likes
        self.dislikes = dislikes

class tmdb():
    genre = StringField(required=True, max_length=50)
    popularity = StringField(required=True, max_length=50)
    vote_average = StringField(required=True, max_length=50)

    def __init__(self, genre, popularity, vote_average, *args, **values):
        self.genre = genre
        self.popularity = popularity
        self.vote_average = vote_average
