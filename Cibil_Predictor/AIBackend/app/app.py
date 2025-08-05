from flask import Flask
from flask_cors import CORS
from app.routes import ai_analyzer_blueprint  # Make sure this file exists and loads your model

app = Flask(__name__)
CORS(app)

# Register blueprint
app.register_blueprint(ai_analyzer_blueprint, url_prefix="/api/ai-analyzer")

@app.route("/")
def home():
    return "AI Backend is running!"

# ✅ This must come last
if __name__ == "__main__":
    app.run(port=5001)
