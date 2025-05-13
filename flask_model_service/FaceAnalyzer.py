import cv2
import dlib
import numpy as np
import math
from imutils import face_utils
from facial_detections import detectFace

shapePredictorModel = 'shape_predictor_model/shape_predictor_68_face_landmarks.dat'
shapePredictor = dlib.shape_predictor(shapePredictorModel)
faceDetector = dlib.get_frontal_face_detector()
font = cv2.FONT_HERSHEY_PLAIN

# Modèle 3D de repères faciaux
model_points = np.array([
    (0.0, 0.0, 0.0),             # Nose tip
    (0.0, -330.0, -65.0),        # Chin
    (-255.0, 170.0, -135.0),     # Left eye left corner
    (225.0, 170.0, -135.0),      # Right eye right corner
    (-150.0, -150.0, -125.0),    # Left Mouth corner
    (150.0, -150.0, -125.0)      # Right mouth corner
])

def get_2d_points(img, rotation_vector, translation_vector, camera_matrix, val):
    point_3d = [
        (-val[0], -val[0], val[1]),
        (-val[0],  val[0], val[1]),
        ( val[0],  val[0], val[1]),
        ( val[0], -val[0], val[1]),
        (-val[0], -val[0], val[1]),
        (-val[2], -val[2], val[3]),
        (-val[2],  val[2], val[3]),
        ( val[2],  val[2], val[3]),
        ( val[2], -val[2], val[3]),
        (-val[2], -val[2], val[3])
    ]
    point_3d = np.array(point_3d, dtype=np.float32).reshape(-1, 3)
    dist_coeffs = np.zeros((4,1))
    point_2d, _ = cv2.projectPoints(point_3d, rotation_vector, translation_vector, camera_matrix, dist_coeffs)
    return np.int32(point_2d.reshape(-1, 2))

def head_pose_points(img, rotation_vector, translation_vector, camera_matrix):
    val = [1, 0, img.shape[1], img.shape[1] * 2]
    point_2d = get_2d_points(img, rotation_vector, translation_vector, camera_matrix, val)
    y = (point_2d[5] + point_2d[8]) // 2
    x = point_2d[2]
    return (x, y)

def detect_and_estimate_pose(frame):
    label="undefined"
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faceCount,faces=detectFace(frame=frame)
    size = frame.shape
    focal_length = size[1]
    center = (size[1] / 2, size[0] / 2)
    camera_matrix = np.array([
        [focal_length, 0, center[0]],
        [0, focal_length, center[1]],
        [0, 0, 1]
    ], dtype="double")
    
    for face in faces:
        landmarks = shapePredictor(gray, face)
        image_points = np.array([
            [landmarks.part(30).x, landmarks.part(30).y], # Nose tip
            [landmarks.part(8).x, landmarks.part(8).y],   # Chin
            [landmarks.part(36).x, landmarks.part(36).y], # Left eye
            [landmarks.part(45).x, landmarks.part(45).y], # Right eye
            [landmarks.part(48).x, landmarks.part(48).y], # Left mouth
            [landmarks.part(54).x, landmarks.part(54).y]  # Right mouth
        ], dtype="double")

        dist_coeffs = np.zeros((4,1))
        success, rotation_vector, translation_vector = cv2.solvePnP(
            model_points, image_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_UPNP
        )

        nose_end, _ = cv2.projectPoints(
            np.array([(0.0, 0.0, 1000.0)]),
            rotation_vector, translation_vector, camera_matrix, dist_coeffs
        )

        p1 = tuple(image_points[0].astype(int))
        p2 = tuple(nose_end[0][0].astype(int))
        x1, x2 = head_pose_points(frame, rotation_vector, translation_vector, camera_matrix)

        # Angle estimation
        try:
            m1 = (p2[1] - p1[1]) / (p2[0] - p1[0])
            ang1 = int(math.degrees(math.atan(m1)))
        except:
            ang1 = 90
        try:
            m2 = (x2[1] - x1[1]) / (x2[0] - x1[0])
            ang2 = int(math.degrees(math.atan(-1 / m2)))
        except:
            ang2 = 90
        
        if ang1 >= 45:
            label = "Head Up"
        elif ang1 <= -45:
            label = "Head Down"
        elif ang2 >= 45:
            label = "Head Right"
        elif ang2 <= -45:
            label = "Head Left"
        else:
            label = "Straight"

        # Affichage
        cv2.putText(frame, label, (face.left(), face.top()-10), font, 2, (0, 255, 0), 2)
        cv2.rectangle(frame, (face.left(), face.top()), (face.right(), face.bottom()), (0, 255, 255), 2)
        cv2.line(frame, p1, p2, (255, 0, 0), 2)
    return frame,label

