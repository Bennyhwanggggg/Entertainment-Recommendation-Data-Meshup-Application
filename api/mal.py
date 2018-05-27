import csv
import getpass
import requests
import xml.etree.ElementTree as ET

from html import unescape
from time import sleep
from urllib.parse import quote 

username = input("Username: ")
password = getpass.getpass()

with open("raw_data/anime.csv", 'r') as csvin:
    with open("raw_data/anime_updated.csv", 'w') as csvout:
        reader = csv.DictReader(csvin)
        writer = csv.DictWriter(csvout, reader.fieldnames + ["start_date", "end_date"])
        writer.writeheader()

        for row in reader:
            url = "https://myanimelist.net/api/anime/search.xml?q="
            url += quote(unescape(row["name"]))
            r = requests.get(url, auth=(username, password))
            if r.status_code != 200:
                continue

            root = ET.fromstring(r.text)
            print(root.find("entry").find("title").text)
            start_date = root.find("entry").find("start_date").text
            end_date = root.find("entry").find("end_date").text

            row["start_date"] = start_date
            row["end_date"] = end_date
            writer.writerow(row)
            
            # API rate limiting
            sleep(1)
