from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
import os
import random
from datetime import datetime, timedelta

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Sample data for bins
bins = [
    {"id": 1, "lat": 25.437863, "lng": 81.792751, "status": "full", "fillLevel": 95},
    {"id": 2, "lat": 25.4589, "lng": 81.8523, "status": "empty", "fillLevel": 10},
    {"id": 3, "lat": 25.4422, "lng": 81.8339, "status": "full", "fillLevel": 90},
    {"id": 4, "lat": 25.4497, "lng": 81.8347, "status": "empty", "fillLevel": 5},
    {"id": 5, "lat": 25.4389, "lng": 81.8456, "status": "full", "fillLevel": 85}
]

# Sample data for activities
activities = [
    {"id": 1, "type": "bin_full", "binId": 1, "timestamp": "2023-06-01T10:00:00"},
    {"id": 2, "type": "bin_collected", "binId": 2, "timestamp": "2023-06-01T11:00:00"},
    {"id": 3, "type": "bin_full", "binId": 3, "timestamp": "2023-06-01T12:00:00"}
]

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/dashboard')
def dashboard():
    return app.send_static_file('dashboard.html')

@app.route('/bin-locations')
def bin_locations():
    return app.send_static_file('bin-locations.html')

@app.route('/analytics')
def analytics():
    return app.send_static_file('analytics.html')

@app.route('/api/bins', methods=['GET'])
def get_bins():
    return jsonify(bins)

@app.route('/api/activities', methods=['GET'])
def get_activities():
    return jsonify(activities)

@app.route('/api/bins/<int:bin_id>/status', methods=['GET'])
def get_bin_status(bin_id):
    bin = next((b for b in bins if b["id"] == bin_id), None)
    if bin:
        return jsonify({"status": bin["status"], "fillLevel": bin["fillLevel"]})
    return jsonify({"error": "Bin not found"}), 404

@app.route('/api/bins/<int:bin_id>/status', methods=['PUT'])
def update_bin_status(bin_id):
    bin = next((b for b in bins if b["id"] == bin_id), None)
    if bin:
        data = request.json
        bin["status"] = data.get("status", bin["status"])
        bin["fillLevel"] = data.get("fillLevel", bin["fillLevel"])
        
        # Add activity
        activity = {
            "id": len(activities) + 1,
            "type": "bin_status_updated",
            "binId": bin_id,
            "timestamp": datetime.now().isoformat()
        }
        activities.append(activity)
        
        return jsonify({"success": True, "bin": bin})
    return jsonify({"error": "Bin not found"}), 404

@app.route('/api/simulate/update', methods=['POST'])
def simulate_update():
    # Randomly update bin statuses
    for bin in bins:
        if random.random() < 0.3:  # 30% chance to update
            bin["fillLevel"] = min(100, bin["fillLevel"] + random.randint(5, 15))
            if bin["fillLevel"] >= 80:
                bin["status"] = "full"
                
                # Add activity
                activity = {
                    "id": len(activities) + 1,
                    "type": "bin_full",
                    "binId": bin["id"],
                    "timestamp": datetime.now().isoformat()
                }
                activities.append(activity)
    
    return jsonify({"success": True, "message": "Simulation updated"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)