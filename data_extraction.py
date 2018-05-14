import os
import pandas as pd
PATH =os.path.dirname(os.path.realpath(__file__))
raw_data_path = os.path.join(PATH, 'Raw Data')

'''
Get data like this?? Or is there another O(1) method
for row in data:
    if row['name'] == 'One Punch Man':
        print(row)
'''

# extract anime data
def get_anime_data(file='anime.csv'):
    raw_data = pd.read_csv(os.path.join(raw_data_path, file))
    raw_data = raw_data.drop('anime_id', 1)
    raw_data = raw_data.drop('members', 1)
    data = raw_data.to_dict(orient='records')
    return data


def get_movie_data(file='tmdb_5000_movies.csv'):
    raw_data = pd.read_csv(os.path.join(raw_data_path, file))
    raw_data = raw_data.drop('runtime', 1)
    raw_data = raw_data.drop('spoken_languages', 1)
    raw_data = raw_data.drop('tagline', 1)
    raw_data = raw_data.drop('vote_count', 1)
    raw_data = raw_data.drop('original_language', 1)
    raw_data = raw_data.drop('homepage', 1)
    raw_data = raw_data.drop('original_title', 1)
    raw_data = raw_data.drop('keywords', 1)
    raw_data = raw_data.drop('status', 1)
    data = raw_data.to_dict(orient='records')
    return data

# With book data, another process is required to get the book tags by using goodread_book_id and book_tags.csv.
# This is to be implemented later and will occur just before putting data into database.
def get_book_data(file='books.csv'):
    raw_data = pd.read_csv(os.path.join(raw_data_path, file))
    raw_data = raw_data.drop('isbn13', 1)
    raw_data = raw_data.drop('ratings_count', 1)
    raw_data = raw_data.drop('work_ratings_count', 1)
    raw_data = raw_data.drop('ratings_1', 1)
    raw_data = raw_data.drop('ratings_2', 1)
    raw_data = raw_data.drop('ratings_3', 1)
    raw_data = raw_data.drop('ratings_4', 1)
    raw_data = raw_data.drop('ratings_5', 1)
    raw_data = raw_data.drop('language_code', 1)
    raw_data = raw_data.drop('original_title', 1)
    raw_data = raw_data.drop('books_count', 1)
    # Don't drop image url yet as it may be useful later?
    data = raw_data.to_dict(orient='records')
    return data
