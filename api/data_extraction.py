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
    raw_data = raw_data.drop('average_rating', 1)
    raw_data = raw_data.drop('revenue_test', 1)
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
            reject = ['nyt', 'New Your Time', 'Library', 'library', 'Accessible', 'Large', 'type', 'Print', 'print', 'Internet', 'Archive', 'Wishlist', 'strips']
            fiction = ['Troll', 'Fiction', 'Batman', 'Spy', 'Spies']
            thriller = ['Homicide', 'Abusive', 'abusive', 'Thriller', 'Psychology', 'Horror', 'Detectives', 'detectives', 'criminal', 'Criminal', 'Secret', 'Violence']
            comic = ['comic', 'Graphic']
            sen = ['Horror comic books', 'Japan', 'Comic', 'attack', 'Fate']
            literature = ['English', 'century', 'Literature', 'Britain', 'British' 'Revolution', 'Translation', 'translation', 'relation', 'Historical', 'historical', 'academic']
            war = ['War', 'World', 'Ship']
            dra = ['Relations', 'Romance', 'Family', 'friendship', 'Female', 'Friendship', 'Revenge', 'Teenage', 'drama', 'Uncle', 'uncle', 'Grand', 'student', 'School', 'school']
            fant = ['Ambition', 'Dragon', 'Fantasy', 'Dream', 'Heroes', 'Imaginary', 'creature', 'Titan', 'Sailor', 'fantasy']
            life = ['Life', 'parent', 'Parent', 'Lifestyle', 'life', 'Experience']
            comedy = ['funny', 'Jokes', 'Dream', 'Circus']
            scifi = ['Time', 'Science', 'Chemistry', 'Space', 'technology', 'space', 'explore']
            supernatur = ['Supernatural', 'Vampires', 'Evil', 'Spirituality']
            superpow = ['Royalty', 'tale', 'God']
            for subject in subjects:
                if any(word in subject['name'] for word in reject):
                    continue
                elif any(word in subject['name'] for word in fiction):
                    genres.append('Fiction')
                elif any(word in subject['name'] for word in thriller):
                    genres.append('Thriller')
                elif any(word in subject['name'] for word in comic):
                    genres.append('Shounen')
                elif any(word in subject['name'] for word in sen):
                    genres.append('Seinen')
                elif any(word in subject['name'] for word in literature):
                    genres.append('Literature')
                elif any(word in subject['name'] for word in war):
                    genres.append('Military')
                elif any(word in subject['name'] for word in dra):
                    genres.append('Drama')
                elif any(word in subject['name'] for word in fant):
                    genres.append('Fantasy')
                elif any(word in subject['name'] for word in comedy):
                    genres.append('Comedy')
                elif any(word in subject['name'] for word in life):
                    genres.append('Slice of Life')
                elif any(word in subject['name'] for word in scifi):
                    genres.append('Sci-Fi')
                elif any(word in subject['name'] for word in supernatur):
                    genres.append('Supernatural')
                elif any(word in subject['name'] for word in superpow):
                    genres.append('Super Power')
                elif subject['name'] not in genres and not subject['name'].isdigit() and subject['name'].isalpha():
                    genres.append(subject['name'])
            genres = ', '.join(genres)
        except:
            genres = 'Undefined'
        if not genres or genres == ' ' or genres == 'Undefined':
            genres = []
            fiction_list = ['King', 'Lord', 'Harry', 'Star', 'Kill', 'Letter', 'Games', 'Animal', 'Hobbit', 'Game', 'Great', 'Forgot', 'Dreams', 'Maze']
            if any(word in data['title'] for word in fiction_list):
                genres.append('Fiction')
            super_list = ['Super', 'power', 'Power', 'Mighty', 'mighty']
            if any(word in data['title'] for word in super_list):
                genres.append('Super Power')
            fantasylist = ['Dragon', 'Sun', 'Magic', 'Adventure', 'adventure', 'journey', 'Journey', 'Tale', 'tale', 'Legend', 'legend', 'giant', 'Giant', 'Dream']
            if any(word in data['title'] for word in fantasylist):
                genres.append('Fantasy')
            thrillerlist = ['Missing', 'Murderer', 'Grey', 'kill', 'Power', 'power', 'Death', 'death']
            if any(word in data['title'] for word in thrillerlist):
                genres.append('Thriller')
            machinelist = ['Machine', 'machine', 'robot', 'Robot', 'iron', 'Iron', 'metal', 'Metal']
            if any(word in data['title'] for word in machinelist):
                genres.append('Mecha')
            scifilist = ['Time', 'time']
            if any(word in data['title'] for word in scifilist):
                genres.append('Sci-FI')
            dramalist = ['Secret', 'boy', 'Girl', 'Moon', 'girl', 'moon', 'Family', 'family', 'home', 'Love', 'Lovely']
            if any(word in data['title'] for word in dramalist):
                genres.append('Drama')
            litlist = ['Women', 'men', 'Men', 'City', 'Art']
            if any(word in data['title'] for word in litlist):
                genres.append('Literature')
            supernat_list = ['Spirit', 'spirit']
            if any(word in data['title'] for word in supernat_list):
                genres.append('Super Natural')
            if genres:
                genres = ', '.join(genres)
        if not genres:
            genres = 'Undefined'

        data['genre'] = genres
        try:
            data['isbn'] = float(data['isbn'])
            print(data['title'], data['genre'])
            Books(data['title'], data['authors'], data['rating'],
                data['isbn'], data['isbn13'], data['original_publication_year'], data['image_url'], data['small_image_url'], data['genre'], data['revenue']).save()
        except Exception as e:
            print(e)

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
