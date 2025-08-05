import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const AIAnalyzer = () => {
  const [loanData, setLoanData] = useState({
    Gender: "",
    Married: "",
    Dependents: "",
    Education: "",
    Self_Employed: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Total_Income: "",
    Property_Area: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post("http://localhost:5000/api/ai-analyzer", loanData);
      setPrediction(response.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Error fetching AI prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-6 max-w-2xl bg-gradient-to-br from-white to-blue-50 mt-10 rounded-2xl shadow-lg transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2">
          <CheckCircle2 className="text-green-500" /> AI Loan Approval Analyzer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              label: "Select Gender",
              name: "Gender",
              options: [["", "Select Gender"], ["1", "Male"], ["0", "Female"]],
            },
            {
              label: "Married?",
              name: "Married",
              options: [["", "Married?"], ["1", "Yes"], ["0", "No"]],
            },
            {
              label: "Education",
              name: "Education",
              options: [["", "Education"], ["1", "Graduate"], ["0", "Not Graduate"]],
            },
            {
              label: "Self Employed?",
              name: "Self_Employed",
              options: [["", "Self Employed?"], ["1", "Yes"], ["0", "No"]],
            },
            {
              label: "Credit History",
              name: "Credit_History",
              options: [["", "Credit History"], ["1", "Good (1)"], ["0", "Poor (0)"]],
            },
            {
              label: "Property Area",
              name: "Property_Area",
              options: [["", "Select Area"], ["0", "Rural"], ["1", "Semiurban"], ["2", "Urban"]],
            },
          ].map(({ label, name, options }) => (
            <select key={name} name={name} value={loanData[name]} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg bg-white hover:border-blue-400 transition">
              {options.map(([val, text]) => (
                <option key={val} value={val}>{text}</option>
              ))}
            </select>
          ))}

          <input
            type="number"
            name="Dependents"
            value={loanData.Dependents}
            onChange={handleChange}
            placeholder="Number of Dependents"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <input
            type="number"
            name="LoanAmount"
            value={loanData.LoanAmount}
            onChange={handleChange}
            placeholder="Loan Amount"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <input
            type="number"
            name="Loan_Amount_Term"
            value={loanData.Loan_Amount_Term}
            onChange={handleChange}
            placeholder="Loan Term (Days)"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <input
            type="number"
            name="Total_Income"
            value={loanData.Total_Income}
            onChange={handleChange}
            placeholder="Total Monthly Income"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? <><Loader2 className="animate-spin mr-2" /> Analyzing...</> : "Analyze"}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 flex items-center gap-2">
            <AlertCircle className="text-red-500" /> {error}
          </div>
        )}

        {prediction && (
          <div className="mt-6 p-5 bg-white border-l-4 border-green-500 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Analysis Result</h3>
            <p className="text-gray-800"><strong>Loan Approval:</strong> {prediction.loanApproval}</p>
            <p className="text-gray-800"><strong>Predicted CIBIL Score:</strong> {prediction.cibilScore}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AIAnalyzer;