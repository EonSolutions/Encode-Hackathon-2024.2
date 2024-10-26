from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from concrete.ml.deployment import FHEModelClient
import numpy as np
import base64

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
FHE_DIRECTORY = 'tmp/'

client = FHEModelClient(path_dir=FHE_DIRECTORY, key_dir="/tmp/keys_client")

# encrypt the data
@app.route("/encrypt", methods=["POST"])
@cross_origin()
def encrypt():
    bytes = client.quantize_encrypt_serialize(np.array([request.json["value"]]))
    b64 = base64.b64encode(bytes).decode('ascii')
    return jsonify({"encrypted_feedback": b64})

# decrypt the data
@app.route("/decrypt", methods=["POST"])
@cross_origin()
def decrypt():
    return jsonify({"decrypted_feedback": client.deserialize_decrypt_dequantize(request.json["value"]) })

if __name__ == "__main__":
    app.run(port=5001)