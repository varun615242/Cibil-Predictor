const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  Loan_Company: String,
  Loan_Amount_Approved: Number,
  Amount_Repaid: Number,
  EMIs_Left: Number,
  Loan_Type: String,
  due_date: { type: Date, default: null }
});

const CibilSchema = new mongoose.Schema({
  pancard: { type: String, required: true },
  CIBIL_Score: Number,
  Total_Loans: Number,
  Closed_Loans: Number,
  Open_Loans: Number,
  Loans: [LoanSchema]
});

module.exports = mongoose.model("CibilDetails", CibilSchema);
