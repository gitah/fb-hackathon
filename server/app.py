#!flask/bin/python
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

GMAPS_REVGEOCODE_ENDPOINT = "http://maps.googleapis.com/maps/api/geocode/json"
GMAPS_REVGEOCODE_QUERYSTR = "?latlng=%s,%s&sensor=true"

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/location', methods = ['GET'])
def get_city(lat=None, lng=None):
    if not lat:
        lat = float(request.args.get('lat'))
    if not lng:
        lng = float(request.args.get('lng'))

    r = requests.get(GMAPS_REVGEOCODE_ENDPOINT + GMAPS_REVGEOCODE_QUERYSTR % (lat, lng))
    loc_info = r.json()['results'][0]


    response = {
        'postal_code': '',
        'neighborhood': '',
        'county': '',
        'city': ''
    }
    for info in loc_info['address_components']:
        if 'postal_code' in info['types']:
            response['postal_code'] = info['short_name']

        elif 'neighborhood' in info['types']:
            response['neighborhood'] = info['short_name']

        elif 'administrative_area_level_1' in info['types']:
            response['city'] = info['short_name']

        elif 'administrative_area_level_2' in info['types']:
            response['country'] = info['short_name']
            
    return jsonify(response)

@app.route('/image', methods = ['GET'])
def get_images(nhood=None):
    pass

if __name__ == '__main__':
    app.run(debug = True)
    #get_city(40.714224, -73.961452)

