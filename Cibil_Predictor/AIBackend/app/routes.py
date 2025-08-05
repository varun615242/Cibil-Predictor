from flask import Blueprint, request, jsonify
import joblib
import os

ai_analyzer_blueprint = Blueprint('ai_analyzer', __name__)

# Load the loan approval model
loan_model_path = os.path.join(os.path.dirname(__file__), '../models/loan_approval_model.pkl')
loan_model = joblib.load(loan_model_path)

@ai_analyzer_blueprint.route('', methods=['POST'])
def analyze():
    data = request.json

    try:
        # Safe type conversion from frontend string to float
        Gender = float(data.get("Gender", 0))
        Married = float(data.get("Married", 0))
        Dependents = float(data.get("Dependents", 0))
        Education = float(data.get("Education", 0))
        Self_Employed = float(data.get("Self_Employed", 0))
        LoanAmount = float(data.get("LoanAmount", 0))
        Loan_Amount_Term = float(data.get("Loan_Amount_Term", 0))
        Credit_History = float(data.get("Credit_History", 0))
        Total_Income = float(data.get("Total_Income", 0))
        Property_Area = float(data.get("Property_Area",0))

        # Loan feature vector
        loan_features = [
            Gender,
            Married,
            Dependents,
            Education,
            Self_Employed,
            LoanAmount,
            Loan_Amount_Term,
            Credit_History,
            Total_Income,
            Property_Area
        ]

        # Predict loan approval status (1 for approved, 0 for rejected)
        loan_pred = loan_model.predict([loan_features])[0]

        # Return result as JSON
        return jsonify({
            "loanApproval": "Approved" if loan_pred == 1 else "Rejected"
        })

    except Exception as e:
        print("Error during prediction:", e)
        return jsonify({"error": "Error processing AI prediction"}), 500
