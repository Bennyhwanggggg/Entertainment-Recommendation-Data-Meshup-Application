import os
import pandas as pd
import chardet

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
    raw_data = raw_data.fillna(0)
    data = raw_data.to_dict(orient='records')
    return data


def get_movie_data(file='IMDB-Movie-Data.csv'):
    raw_data = pd.read_csv(os.path.join(raw_data_path, file))
    raw_data = raw_data.drop('Votes', 1)
    raw_data = raw_data.drop('Rank', 1)
    raw_data = raw_data.fillna(0)
    data = raw_data.to_dict(orient='records')
    return data


# Use xlsx. For some reason the csv file has data loss. Maybe delete some data as well to make the size smaller
def get_book_data(file='br.xlsx'):
    # raw_data = pd.read_csv(os.path.join(raw_data_path, file))
    raw_data = pd.read_excel(os.path.join(raw_data_path, file))
    raw_data = raw_data.drop('reviewsCount', 1)
    raw_data = raw_data.drop('reviewerName', 1)
    raw_data = raw_data.drop('reviewerRatings', 1)
    raw_data = raw_data.drop('bookID', 1)
    raw_data = raw_data.fillna('None')
    data = raw_data.to_dict(orient='records')
    return data






