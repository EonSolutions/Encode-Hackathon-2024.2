import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from concrete.ml.deployment import FHEModelClient, FHEModelServer
import base64


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

labels = [
    "Fashion",
    "Electronics",
    "Food",
    "Home",
]

FHE_DIRECTORY = 'tmp/'

# Setup the client
client = FHEModelClient(path_dir=FHE_DIRECTORY, key_dir="/tmp/keys_client")
serialized_evaluation_keys = client.get_serialized_evaluation_keys()

# Setup the server
server = FHEModelServer(path_dir=FHE_DIRECTORY)
server.load()

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    try:
        # Get the encrypted data from the request
        encrypted_data = request.json['value']
        # Convert from string to bytes
        # print(encrypted_data)
        encrypted_data = base64.b64decode(encrypted_data)
        # print(encrypted_data)
        # Server processes the encrypted data
        encrypted_result = server.run(encrypted_data, serialized_evaluation_keys)
        # Return the prediction as a JSON response
        results = encrypted_result
        return jsonify({'encrypted_result': base64.b64encode(results).decode('ascii')}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5002)