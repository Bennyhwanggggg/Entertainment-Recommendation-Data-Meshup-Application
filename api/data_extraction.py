import os
import pandas as pd
from mongoengine import connect
from database import Animes, Books, Movies
import chardet
import requests
import json

connect(host='mongodb://comp9321:comp9321@ds225840.mlab.com:25840/data')

PATH = os.path.dirname(os.path.realpath(__file__))
RAW_DATA_PATH = os.path.join(PATH, 'raw_data')

# template_dir = os.path.abspath('../client/templates')
# static_dir = '../client/static'
# app = Flask(__name__,template_folder=template_dir,static_folder=static_dir)
# app.config["APPLICATION_ROOT"] = "/abc/123"
# CORS(app)

'''
Get data like this?? Or is there another O(1) method
for row in data:
    if row['name'] == 'One Punch Man':
        print(row)
'''

# extract anime data
def extract_anime_data(file='anime_updated.csv'):
    raw_data = pd.read_csv(os.path.join(RAW_DATA_PATH, file))
    raw_data = raw_data.fillna(0)
    data = raw_data.to_dict(orient='records')
    return data

def extract_movie_data(file='IMDB-Movie-Data.csv'):
    raw_data = pd.read_csv(os.path.join(RAW_DATA_PATH, file))
    raw_data = raw_data.drop('Votes', 1)
    raw_data = raw_data.drop('Rank', 1)
    raw_data = raw_data.fillna(0)
    data = raw_data.to_dict(orient='records')
    return data

# Use xlsx. For some reason the csv file has data loss.
# Maybe delete some data as well to make the size smaller
def extract_book_data(file='br.xlsx'):
    # raw_data = pd.read_csv(os.path.join(RAW_DATA_PATH, file))
    raw_data = pd.read_excel(os.path.join(RAW_DATA_PATH, file))
    raw_data = raw_data.drop('reviewsCount', 1)
    raw_data = raw_data.drop('reviewerName', 1)
    raw_data = raw_data.drop('reviewerRatings', 1)
    raw_data = raw_data.drop('bookID', 1)
    raw_data = raw_data.fillna('None')
    data = raw_data.to_dict(orient='records')
    return data

def extract_book_data2(file='oldgoodbooks.csv'):
    # raw_data = pd.read_csv(os.path.join(RAW_DATA_PATH, file))
    raw_data = pd.read_csv(os.path.join(RAW_DATA_PATH, file))
    raw_data = raw_data.drop('book_id', 1)
    raw_data = raw_data.drop('work_id', 1)
    raw_data = raw_data.drop('goodreads_book_id', 1)
    raw_data = raw_data.drop('best_book_id', 1)
    raw_data = raw_data.drop('books_count', 1)
    raw_data = raw_data.drop('original_title', 1)
    raw_data = raw_data.drop('language_code', 1)
    raw_data = raw_data.drop('ratings_count', 1)
    raw_data = raw_data.drop('work_ratings_count', 1)
    raw_data = raw_data.drop('work_text_reviews_count', 1)
    raw_data = raw_data.drop('ratings_1', 1)
    raw_data = raw_data.drop('ratings_2', 1)
    raw_data = raw_data.drop('ratings_3', 1)
    raw_data = raw_data.drop('ratings_4', 1)
    raw_data = raw_data.drop('ratings_5', 1)
    raw_data['average_rating'] = raw_data['average_rating'].apply(lambda x: x*2)
    raw_data = raw_data.fillna('None')
    data = raw_data.to_dict(orient='records')
    return data

def dataimport():
    print('importing book data....', end='')
    bookdata = extract_book_data2()
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
    moviedata = extract_movie_data()
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
    animedata = extract_anime_data()
    count = 0
    for data in animedata:
        if count == 9000:
            break
        try:
            print(data)
            Animes(data['name'], data['genre'], data['type'], data['episodes'],
                    data['rating'], data['start_date'], data['end_date'], data['revenue']).save()
            count += 1
        except Exception as e:
            print(e)
            continue
    print('done!')
