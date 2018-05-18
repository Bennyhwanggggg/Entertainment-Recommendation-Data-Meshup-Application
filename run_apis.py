from flask import Blueprint, Flask
from data_publication import publication
from data_analytics import analytics

app = Flask(__name__)
app.register_blueprint(publication)
app.register_blueprint(analytics)
app.run(debug=True)
