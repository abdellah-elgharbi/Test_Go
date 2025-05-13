from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import cv2
import numpy as np
import base64
import dlib
import os
import json
from datetime import datetime
from pymongo import MongoClient
from py_eureka_client import eureka_client
# Import function from FaceAnalyzer - assuming this is your existing module
from FaceAnalyzer import detect_and_estimate_pose

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

# MongoDB connection
try:
    # Remplacez par vos informations de connexion MongoDB
    mongo_client = MongoClient('mongodb://localhost:27017/')
    db = mongo_client['fraud_detection_db']
    fraud_detection_collection = db['fraud_detections']  # Collection spécifique pour les fraudes
    print("MongoDB connection established successfully")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    mongo_client = None

# Initialize face detection and shape prediction
try:
    # Path to model file
    shapePredictorModel = 'shape_predictor_model/shape_predictor_68_face_landmarks.dat'
    shapePredictor = dlib.shape_predictor(shapePredictorModel)
    faceDetector = dlib.get_frontal_face_detector()
    
    # 3D facial landmark model
    model_points = np.array([
        (0.0, 0.0, 0.0),           # Nose tip
        (0.0, -330.0, -65.0),      # Chin
        (-255.0, 170.0, -135.0),   # Left eye left corner
        (225.0, 170.0, -135.0),    # Right eye right corner
        (-150.0, -150.0, -125.0),  # Left Mouth corner
        (150.0, -150.0, -125.0)    # Right mouth corner
    ])
    
    print("Face detector and prediction model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    print("Make sure the 'shape_predictor_68_face_landmarks.dat' file is in the 'shape_predictor_model' folder")

@app.route('/')
def index():
    return render_template('index.html')  # Serves HTML page

# This is the endpoint used by the frontend (changed from /analyze to /analyse)
@app.route('/analyse', methods=['POST'])
def analyse():
    data = request.json
    
    # Validate required fields from frontend request
    if not all(key in data for key in ['testId', 'studentId', 'timestamp', 'image']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    test_id = data['testId']
    student_id = data['studentId']
    timestamp = data['timestamp']
    
    try:
        # Decode base64 image
        image_data = data['image'].split(',')[1] if ',' in data['image'] else data['image']
        img_bytes = base64.b64decode(image_data)
        
        # Convert to OpenCV image
        img_np = np.frombuffer(img_bytes, dtype=np.uint8)
        frame = cv2.imdecode(img_np, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({'error': 'Failed to decode image'}), 400
        
        # Analyze image for head orientation and face detection
        result_frame, pose_label = detect_and_estimate_pose(frame)
        print(pose_label)
        # Determine if fraud is detected based on pose
        fraud_detected = pose_label != "Looking straight"
        fraud_details = ""
        
        if fraud_detected:
            fraud_details = f"Head orientation: {pose_label}"
        
        # For debugging: convert result frame to base64
        _, buffer = cv2.imencode('.jpg', result_frame)
        result_image = base64.b64encode(buffer).decode('utf-8')
        
        # Store results in MongoDB
        if mongo_client:
            try:
                # Generate unique fraud ID
                fraud_id = f"fraud_{test_id}_{student_id}_{datetime.now().strftime('%Y%m%d%H%M%S%f')}"
                
                # Create document for MongoDB
                result_document = {
                    'fraudId': fraud_id,
                    'testId': test_id,
                    'studentId': student_id,
                    'timestamp': timestamp,
                    'poseLabel': pose_label,
                    'fraudDetected': fraud_detected,
                    'details': fraud_details if fraud_detected else "No suspicious behavior detected",
                    'resultImage': f"data:image/jpeg;base64,{result_image}"
                }
                
                # Insert into MongoDB (specific collection for fraud detections)
                if pose_label in  ["Head Left", "Head Right", "Head Up", "Head Down"]:
                   result = fraud_detection_collection.insert_one(result_document)
                   print(f"Stored fraud detection in MongoDB with ID: {result.inserted_id}")
            except Exception as e:
                print(f"Error storing results in MongoDB: {e}")
        
        # Return response matching what frontend expects
        return jsonify({
            'fraudDetected': fraud_detected,
            'details': fraud_details if fraud_detected else "No suspicious behavior detected",
            'pose': pose_label,
            'result_image': f"data:image/jpeg;base64,{result_image}"  # For debugging
        })
        
    except Exception as e:
        print(f"Error analyzing image: {e}")
        return jsonify({'error': str(e)}), 500

# Add endpoint to retrieve fraud detection results from MongoDB
@app.route('/get-fraud-detections', methods=['GET'])
def get_fraud_detections():
    test_id = request.args.get('testId')
    student_id = request.args.get('studentId')
    fraud_id = request.args.get('fraudId')
    
    if not mongo_client:
        return jsonify({'error': 'MongoDB connection not available'}), 500
        
    query = {}
    if test_id:
        query['testId'] = test_id
    if student_id:
        query['studentId'] = student_id
    if fraud_id:
        query['fraudId'] = fraud_id
        
    try:
        results = list(fraud_detection_collection.find(query, {'_id': 0}))
        return jsonify(results)
    except Exception as e:
        print(f"Error retrieving fraud detections from MongoDB: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint to check if the service is running"""
    status = 'ok'
    mongo_status = 'connected' if mongo_client else 'disconnected'
    
    return jsonify({
        'status': status,
        'mongodb': mongo_status
    }), 200

if __name__ == '__main__':
    # Check if model directory exists
    if not os.path.exists('shape_predictor_model'):
        os.makedirs('shape_predictor_model')
        print("The 'shape_predictor_model' folder has been created. Please place the shape_predictor_68_face_landmarks.dat file there")
    eureka_client.init(
        eureka_server="http://localhost:8761/eureka",  # Change this if your Eureka is hosted elsewhere
        app_name="fraud-detection-service",
        instance_port=5000,
        instance_ip="127.0.0.1"
    )
    # Start Flask server
    app.run(debug=True, host='0.0.0.0', port=5000)