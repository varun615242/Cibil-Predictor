# 💳 CIBIL Score & Loan Approval Prediction Dashboard

This is a complete full-stack AI-integrated credit dashboard that allows users to:

- 🔍 View and visualize their **CIBIL score**
- 📊 Analyze **loan performance and EMIs**
- 🤖 Predict **loan approval** using AI
- 🧾 Generate PDF reports
- 📬 Receive email alerts for due loans

---

## ⚙️ Tech Stack

### 💻 Frontend
- **React (Vite)**
- **Tailwind CSS**
- **Lucide React Icons** – For crisp, modern icons  
- **React Icons** – For rich icon library (FontAwesome, Bootstrap Icons, etc.)
- **Recharts** – For powerful and elegant charts
- **React-to-Print** – To preview & download reports

### 🔐 Backend
- **Node.js + Express**
- **MongoDB Atlas** for user & credit data
- **JWT Authentication**
- **Multer** for profile picture upload
- **Nodemailer** for email alerts

### 🤖 AI Model Server
- **Python Flask**
- **ML Models**: Logistic Regression, Random Forest, XGBoost (tuned & ensembled)
- **GridSearchCV**, **ROC-AUC**, **F1-Score** for performance

---

## 🔥 Key Features

### 🧾 Dashboard
- CIBIL Score gauge chart
- Loan type breakdown
- EMI bar chart
- Account mix pie chart
- Total repaid vs approved chart

### 🤖 AI Analyzer
- Predicts loan approval based on financial details
- Ensemble model with highest ROC-AUC

### 📬 Alerts
- User enters due dates
- Cron job checks due dates daily
- Emails are sent 2 days before due date and on due date

### 🧾 Report Generator
- Preview credit report
- One-click download as PDF

### 👤 My Account
- View profile info
- Update profile pic from local file system
- Change password
- Delete account

---

## 📦 Setup Instructions

### 1. 🔁 Clone Repo
```bash
git clone https://github.com/yourusername/credit-dashboard.git
cd credit-dashboard
```

### 2. 🚀 Backend Setup


```bash
cd backend
npm install
node server.js
```


### 3. 🤖 Flask AI Server


```bash
cd ai-flask
pip install -r requirements.txt
python app.py
```


### 4. 🌐 Frontend Setup


```bash
cd frontend
npm install
npm run dev
```


### 📦 Major Dependencies


```bash
npm install axios react-router-dom lucide-react react-icons recharts react-to-print
```
and also tailwindcss

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` folder with the following variables:

```bash
MONGO_URI=your_mongodb_connection_string 
JWT_SECRET=your_jwt_secret 
GMAIL_USER=your_gmail_address 
GMAIL_PASS=your_gmail_app_password
```


🎓 Author
varun pothurajula
