const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const cron = require("node-cron");
const { sendEmail } = require("./emailserver"); // Import the email service
const Loan = require("./models/CIBILDetails"); // Import Loan model

// Import routes and middleware
const authRoutes = require("./routes/auth");
const cibilRoutes = require("./routes/cibil");
const verifyToken = require("./middleware/verifyToken");

dotenv.config();

const app = express();

// Allow larger request bodies (10mb size limit)
app.use(express.json({ limit: "50mb" })); // Adjust the size limit as needed
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For form data
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Public Routes
app.use("/api/auth", authRoutes);

// Protected Routes
app.use("/api/cibil", verifyToken, cibilRoutes);

// AI Prediction Route
app.post("/api/ai-analyzer", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5001/api/ai-analyzer", req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Flask AI API:", error);
    res.status(500).json({ error: "Error processing AI prediction" });
  }
});

// Scheduler for sending email alerts
const checkDueDates = async () => {
  const currentDate = new Date();
  try {
    const loans = await Loan.find(); // Fetch all loans from DB
    loans.forEach((loan) => {
      const dueDate = new Date(loan.due_date);
      const daysRemaining = (dueDate - currentDate) / (1000 * 3600 * 24);

      if (daysRemaining <= 2 && daysRemaining > 1) {
        sendEmail(
          loan.userEmail,
          "Reminder: Loan Due in 2 Days",
          `Your loan with ${loan.Loan_Company} is due in 2 days. Please make the payment on time.`
        );
      }

      if (daysRemaining <= 0 && daysRemaining > -1) {
        sendEmail(
          loan.userEmail,
          "Reminder: Loan Due Today",
          `Your loan with ${loan.Loan_Company} is due today. Please make the payment.`
        );
      }
    });
  } catch (err) {
    console.error("Error checking due dates:", err);
  }
};

cron.schedule("* * * * *", checkDueDates);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
