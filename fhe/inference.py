from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from concrete.ml.deployment import FHEModelClient, FHEModelServer
import base64
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cred = credentials.Certificate("flareapp-81251-firebase-adminsdk-v5tkg-a114986bb0.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

labels = [
    "Stressed",
    "Not Stresed"
]

FHE_DIRECTORY = 'tmp/'

# Setup the client
client = FHEModelClient(path_dir=FHE_DIRECTORY, key_dir="/tmp/keys_client")
serialized_evaluation_keys = client.get_serialized_evaluation_keys()

# Setup the server
server = FHEModelServer(path_dir=FHE_DIRECTORY)
server.load()

@app.route('/fhe', methods=['POST'])
@cross_origin()
def fhe():
    try:
        id = request.json['id']
        doc_ref = db.collection('feedbacks').document(id)
        encrypted_data = doc_ref.get().to_dict()["encryptedFeedback"]
        encrypted_result = server.run(base64.b64decode(encrypted_data), serialized_evaluation_keys)
        
        return jsonify({
                'id': id,
                'encrypted_data_hash': request.json['hash'],
                'encrypted_data': encrypted_data,
                'encrypted_result': base64.b64encode(encrypted_result).decode('ascii')
            }), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5002)