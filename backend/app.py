from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

TASKS_FILE = 'tasks.json'

def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, 'r') as f:
            return json.load(f)
    return {"tasks": []}

def save_tasks(tasks_data):
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks_data, f, indent=2)

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks_data = load_tasks()
    return jsonify(tasks_data)

@app.route('/api/tasks', methods=['POST'])
def create_task():
    tasks_data = load_tasks()
    new_task = request.json
    if tasks_data['tasks']:
        new_task['id'] = max(task['id'] for task in tasks_data['tasks']) + 1
    else:
        new_task['id'] = 1
    tasks_data['tasks'].append(new_task)
    save_tasks(tasks_data)
    return jsonify(new_task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    tasks_data = load_tasks()
    for task in tasks_data['tasks']:
        if task['id'] == task_id:
            task.update(request.json)
            save_tasks(tasks_data)
            return jsonify(task)
    return jsonify({'error': 'Task not found'}), 404

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    tasks_data = load_tasks()
    tasks_data['tasks'] = [t for t in tasks_data['tasks'] if t['id'] != task_id]
    save_tasks(tasks_data)
    return jsonify({'message': 'Task deleted'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

