from flask import Blueprint, Flask, request
from .data_publication import publication
from .data_analytics import analytics

def cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = '*'
    request_headers = request.headers.get("Access-Control-Request-Headers")
    resp.headers["Access-Control-Allow-Headers"] = request_headers
    resp.headers['Access-Control-Allow-Methods'] = "DELETE, GET, POST, HEAD, OPTIONS"
    return resp

app = Flask(__name__)
app.url_map.strict_slashes = False
app.register_blueprint(publication)
app.register_blueprint(analytics)
app.after_request(cors)



