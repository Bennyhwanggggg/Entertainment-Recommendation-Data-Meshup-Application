import os
import pandas as pd
import chardet

PATH = os.path.dirname(os.path.realpath(__file__))
RAW_DATA_PATH = os.path.join(PATH, 'raw_data')

'''
Get data like this?? Or is there another O(1) method
for row in data:
    if row['name'] == 'One Punch Man':
        print(row)
'''

# extract anime data
def extract_anime_data(file='anime.csv'):
    raw_data = pd.read_csv(os.path.join(RAW_DATA_PATH, file))
    raw_data = raw_data.drop('anime_id', 1)
    raw_data = raw_data.drop('members', 1)
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

extract_book_data2()
