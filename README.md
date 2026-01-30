# FarmStock
FarmStock – Crop Price Prediction System
1. Project Overview

FarmStock is a Machine Learning–based crop price prediction system designed to help farmers and stakeholders estimate future crop prices using historical agricultural market data from India.

The system uses:
Historical crop price data
A trained ML regression model
A FastAPI backend to serve predictions through an API
This project demonstrates the complete ML pipeline, from data preprocessing to deployment via an API.

2. Problem Statement

Farmers often lack access to reliable information about future crop prices, which leads to:
Poor crop planning decisions
Financial losses due to market uncertainty

Objective:
To build a machine learning model that predicts the modal price of a crop based on historical market data and expose the prediction through an API.

3. Dataset Description

Source: Kaggle – Agriculture-related datasets for India

Dataset Features Used:
Column_Name	     Description
state	         State where the market is located
district	     District of the market
market	         Market name
commodity	     Crop name
variety	         Crop variety
arrival_date	 Date of arrival
min_price	     Minimum price
max_price	     Maximum price
modal_price	     Most common selling price (target variable)
Dataset Size

Rows: 2,238

Columns: 9

Target Variable: modal_price

4. System Architecture:

User / Postman
     |
     |  HTTP POST
     v
FastAPI Backend
     |
     |  Loads trained ML model
     v
ML Model (RandomForest)
     |
     v
Predicted Crop Price

5. Project Folder Structure:

FarmStock/
│
├── backend/
│   ├── api/
│   │   └── main.py          # FastAPI application
│   ├── requirements.txt    # Backend dependencies
│
├── ml/
│   ├── data/
│   │   └── crop_prices.csv # Dataset
│   ├── model/
│   │   └── price_model.pkl # Saved trained model
│   ├── notebook/
│   │   └── training.ipynb  # Data exploration & training
│   └── src/
│       ├── preprocess.py  # Data preprocessing logic
│       ├── train.py       # Model training script
│       └── utils.py
│
├── venv/
└── README.md

6. Machine Learning Pipeline (Core Module):
6.1 Data Preprocessing:

Converted categorical variables (state, market, commodity) using encoding
Extracted month and year from arrival_date
Selected relevant features for training
Handled data type conversions

6.2 Model Selection:

Algorithm Used: RandomForestRegressor
Reason:
Handles non-linear relationships
Works well with categorical encodings
Robust to noise

6.3 Model Training:

Train–test split: 80% training, 20% testing
Model trained using historical data

6.4 Model Evaluation:

Evaluation Metric: Root Mean Squared Error (RMSE)
RMSE measures prediction error in the same units as price

Example output:
RMSE: 1180.42

6.5 Model Saving:

Trained model saved using pickle
Loaded during API startup

7. API Design (FastAPI):\

Endpoint: /predict-price

Method: POST

Request Body (JSON):
{
  "state": "Tamil Nadu",
  "market": "Madurai",
  "commodity": "Tomato",
  "month": 7,
  "year": 2025
}

Response:
{
  "predicted_price": 4127.64
}

8. Running the Project (PowerShell):

8.1 Activate Virtual Environment:
.\venv\Scripts\activate

8.2 Install Dependencies:
pip install -r backend\requirements.txt

8.3 Train the ML Model:
python ml\src\train.py

8.4 Start FastAPI Server:
uvicorn backend.api.main:app --reload


Server runs at:
http://127.0.0.1:8000

9. Testing Using Postman:

Method
POST

URL
http://127.0.0.1:8000/predict-price

Headers
Content-Type: application/json

Sample Output
{
  "predicted_price": 4127.64
}

10. Observations & Limitations:

The predicted price does not vary significantly when changing the month

Reason:

The dataset contains limited seasonal patterns
RandomForest does not model time-series dependencies effectively
This behavior reflects data limitations, not an implementation error.

11. Future Enhancements:

Use time-series models (ARIMA, LSTM)
Add rainfall, demand, and supply data
Improve categorical encoding
Train separate models per commodity
Deploy using Docker or cloud services

12. Conclusion:

FarmStock successfully demonstrates:
End-to-end ML pipeline
Real-world dataset handling
Model training and evaluation
API-based ML deployment

This project validates the use of Machine Learning for agricultural price prediction while clearly identifying areas for future improvement.