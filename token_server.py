from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS so your MkDocs site can call this backend

# Replace with your actual credentials from https://auth.vatsim.net/
CLIENT_ID = ''
CLIENT_SECRET = ''

VATSIM_TOKEN_URL = 'https://auth.vatsim.net/oauth/token'

@app.route('/token', methods=['POST'])
def get_token():
    data = request.get_json()

    # Validate required fields
    if 'code' not in data or 'redirect_uri' not in data:
        return jsonify({'error': 'Missing code or redirect_uri'}), 400

    payload = {
        'grant_type': 'authorization_code',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': data['redirect_uri'],
        'code': data['code'],
    }

    try:
        response = requests.post(VATSIM_TOKEN_URL, data=payload)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.HTTPError as err:
        return jsonify({'error': 'Token exchange failed', 'details': str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
