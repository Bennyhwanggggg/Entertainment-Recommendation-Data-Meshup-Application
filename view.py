from flask import Flask
import os
from flask import Flask,render_template,request,jsonify,redirect, url_for
import json,datetime,urllib,time
from flask_cors import CORS
from mongoengine import connect,StringField, IntField, Document, EmbeddedDocument, ListField, EmbeddedDocumentField
from xml.dom.minidom import parseString
import xlrd,dicttoxml
import codecs
import pickle
import re
from werkzeug.contrib.atom import AtomFeed, FeedEntry
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer)
from functools import wraps

template_dir = os.path.abspath('./templates')
static_dir = './static'
app = Flask(__name__,template_folder=template_dir,static_folder=static_dir)

@app.route("/")
def view():
    return render_template('admin-table.html')

if __name__ == "__main__":
   app.run('localhost', 8000)