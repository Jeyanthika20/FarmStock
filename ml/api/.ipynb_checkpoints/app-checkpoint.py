from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Get the directory where app.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, '..', 'models')  # Go up one level to ml/, then into models/

# Load model and encoders
try:
    model = pickle.load(open(os.path.join(MODELS_DIR, 'model.pkl'), 'rb'))
    le_commodity = pickle.load(open(os.path.join(MODELS_DIR, 'le_commodity.pkl'), 'rb'))
    le_market = pickle.load(open(os.path.join(MODELS_DIR, 'le_market.pkl'), 'rb'))
    le_state = pickle.load(open(os.path.join(MODELS_DIR, 'le_state.pkl'), 'rb'))
    print(" Models loaded successfully!")
except Exception as e:
    print(f" Error loading models: {e}")
    print(f"Looking in: {MODELS_DIR}")

@app.route('/', methods=['GET'])
def home():
    """Homepage - Check if API is running"""
    return jsonify({
        'message': 'FarmStock ML API is running!',
        'status': 'active',
        'endpoints': {
            '/predict-price': 'POST - Predict crop price',
            '/available-options': 'GET - Get available crops, markets, states'
        }
    })

@app.route('/predict-price', methods=['POST'])
def predict_price():
    """Predict crop price based on input"""
    try:
        # Get data from request
        data = request.json
        
        # Extract inputs
        commodity = data['crop']  # e.g., "Rice"
        market = data['market']    # e.g., "Chennai"
        state = data.get('state', 'Tamil Nadu')
        month = int(data['month'])  # e.g., 3 for March
        year = int(data.get('year', 2024))
        
        # Encode categorical values
        commodity_encoded = le_commodity.transform([commodity])[0]
        market_encoded = le_market.transform([market])[0]
        state_encoded = le_state.transform([state])[0]
        
        # Prepare features in correct order
        features = np.array([[commodity_encoded, market_encoded, state_encoded, month, year]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        
        return jsonify({
            'success': True,
            'predicted_price': round(float(prediction), 2),
            'currency': 'INR',
            'unit': 'per quintal',
            'model': 'Random Forest',
            'input': {
                'crop': commodity,
                'market': market,
                'state': state,
                'month': month,
                'year': year
            }
        })
    
    except KeyError as e:
        return jsonify({
            'success': False,
            'error': f'Missing required field: {str(e)}'
        }), 400
    
    except ValueError as e:
        return jsonify({
            'success': False,
            'error': f'Invalid value provided: {str(e)}'
        }), 400
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/available-options', methods=['GET'])
def get_options():
    """Return available crops, markets, states"""
    try:
        return jsonify({
            'success': True,
            'data': {
                'crops': list(le_commodity.classes_),
                'markets': list(le_market.classes_),
                'states': list(le_state.classes_)
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print(" FarmStock ML API Starting...")
    print("=" * 60)
    print(" API running at: http://localhost:5000")
    print(" Endpoints:")
    print("   - GET  /                    → API status")
    print("   - POST /predict-price       → Predict crop price")
    print("   - GET  /available-options   → Get available options")
    print("=" * 60 + "\n")
    
    app.run(debug=True, port=5000)