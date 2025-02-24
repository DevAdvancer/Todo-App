import os
from flask import Flask, request, jsonify
from bson.objectid import ObjectId
import pymongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mongo_url = os.environ.get("MONGO_URL")
if not mongo_url:
    raise ValueError("MONGO_URL is not set. Please add it to the Render environment variables.")

mongo = pymongo.MongoClient(mongo_url)
db = mongo["todo"]
collection = db["todos"]

@app.route('/api/todos', methods=['GET'])
def get_todo():
    todos = collection.find()
    return jsonify([{"id": str(todo["_id"]), "todo": todo["todo"], "status": todo["status"]} for todo in todos])

@app.route('/api/todos', methods=['POST'])
def add_todo():
    todo = request.json
    if "todo" not in todo or "status" not in todo:
        return jsonify({"error": "Missing data"}), 400
    collection.insert_one(todo)
    return jsonify({"message": "Todo added"}), 201

@app.route('/api/todos/<id>', methods=['PUT'])
def update_todo(id):
    todo = request.json
    collection.update_one({"_id": ObjectId(id)}, {"$set": todo})
    return jsonify({"message": "Todo updated"})

@app.route('/api/todos/<id>', methods=['DELETE'])
def delete_todo(id):
    collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Todo deleted"})

if __name__ == "__main__":
    app.run(port=3000, debug=True)
