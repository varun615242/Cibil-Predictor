const express = require("express");
const router = express.Router();
const CibilDetails = require("../models/CIBILDetails");
const verifyToken = require("../middleware/verifyToken"); // Middleware to secure routes

router.get("/data", verifyToken, async (req, res) => {
  console.log("Decoded user from token:", req.user); // 🔍

  const pancard = req.user.pancard;
  if (!pancard) {
    return res.status(400).json({ error: "PAN card info missing in token" });
  }

  try {
    const data = await CibilDetails.findOne({ pancard });
    if (!data) return res.status(404).json({ error: "No data found for PAN" });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "CIBIL fetch failed" });
  }
});


// ✅ POST: Update Due Dates for Loans
router.post("/update-due-dates", verifyToken, async (req, res) => {
  const pancard = req.user.pancard;
  const { updatedLoans } = req.body;

  if (!pancard || !updatedLoans) {
    return res.status(400).json({ error: "Missing pancard or loan data" });
  }

  try {
    const user = await CibilDetails.findOne({ pancard });
    if (!user) return res.status(404).json({ error: "CIBIL record not found" });

    // Loop through and update due_date for each loan
    updatedLoans.forEach((updatedLoan, index) => {
      if (user.Loans[index]) {
        user.Loans[index].due_date = updatedLoan.due_date;
      }
    });

    await user.save();
    res.json({ message: "Due dates updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating due dates" });
  }
});

module.exports = router;
