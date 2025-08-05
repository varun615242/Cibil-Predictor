import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Alerts = () => {
  const [loans, setLoans] = useState([]);
  const [pancard, setPancard] = useState("");
  const [message, setMessage] = useState("");
  const [cibilData, setCibilData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCibilData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not found. Please login again.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/cibil/data", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCibilData(response.data);
        setLoans(response.data.Loans);
        setPancard(response.data.pancard);
        generateAlerts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load CIBIL data");
      }
    };

    fetchCibilData();
  }, []);

  const generateAlerts = (data) => {
    const tempAlerts = [];

    if (data.CIBIL_Score < 650) {
      tempAlerts.push({
        type: "warning",
        message: `⚠️ Your CIBIL Score is ${data.CIBIL_Score}. Consider improving your repayment history.`,
      });
    }

    data.Loans?.forEach((loan) => {
      if (loan.due_date) {
        const dueDate = new Date(loan.due_date);
        const daysRemaining = (dueDate - new Date()) / (1000 * 3600 * 24);

        if (daysRemaining <= 2 && daysRemaining > 1) {
          tempAlerts.push({
            type: "danger",
            message: `💸 Your EMI for ${loan.Loan_Company} is due in 2 days. Please make the payment.`,
          });
        }

        if (daysRemaining <= 0 && daysRemaining > -1) {
          tempAlerts.push({
            type: "danger",
            message: `💸 Your EMI for ${loan.Loan_Company} is due today. Please make the payment.`,
          });
        }
      }
    });

    data.Loans?.forEach((loan) => {
      if (loan.EMIs_Left === 1) {
        tempAlerts.push({
          type: "success",
          message: `✅ You're about to close your loan with ${loan.Loan_Company}. One EMI left!`,
        });
      }
    });

    data.Loans?.forEach((loan) => {
      const ratio = loan.Amount_Repaid / loan.Loan_Amount_Approved;
      if (ratio < 0.2) {
        tempAlerts.push({
          type: "info",
          message: `ℹ️ Consider increasing repayment for ${loan.Loan_Company}. Only ${Math.round(ratio * 100)}% repaid.`,
        });
      }
    });

    setAlerts(tempAlerts);
  };

  const handleChange = (index, value) => {
    const updatedLoans = [...loans];
    updatedLoans[index].due_date = value;
    setLoans(updatedLoans);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to update due dates.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cibil/update-due-dates",
        {
          pancard,
          updatedLoans: loans.map(({ due_date }) => ({
            due_date: due_date ? new Date(due_date).toISOString() : null,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      console.error("Error during update:", err);
      if (err.response && err.response.status === 401) {
        setMessage("Session expired. Please log in again.");
      } else {
        setMessage("Error updating due dates");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-purple-950 to-indigo-900 text-white p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
          <span className="text-yellow-300 animate-pulse">🔔</span> Alerts & Tips
        </h1>

        {error && <p className="text-red-400 font-semibold mb-4">{error}</p>}

        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-lg flex items-start gap-3 transition-all duration-200 transform hover:scale-[1.02] ${
                  alert.type === "danger"
                    ? "bg-red-700"
                    : alert.type === "warning"
                    ? "bg-yellow-400 text-black"
                    : alert.type === "success"
                    ? "bg-green-600"
                    : "bg-blue-500"
                }`}
              >
                <span className="text-2xl">{alert.message.slice(0, 2)}</span>
                <p className="font-semibold flex-1">{alert.message.slice(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white bg-green-700 px-4 py-2 rounded shadow inline-block mt-4">✅ No alerts at the moment. You're all good!</p>
        )}

        <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-10">📆 Update Loan Due Dates</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {loans.map((loan, idx) => (
            <div key={idx} className="bg-white text-black p-4 rounded-xl shadow-md">
              <p><strong>🏢 Loan Company:</strong> {loan.Loan_Company}</p>
              <p><strong>📄 Type:</strong> {loan.Loan_Type}</p>
              <label className="block mt-2 text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={loan.due_date ? loan.due_date.split("T")[0] : ""}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-400 rounded shadow"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl text-white font-semibold shadow-md transition duration-200"
        >
          💾 Save Due Dates
        </button>

        {message && <p className="mt-4 text-yellow-300 font-medium bg-black/20 rounded p-2 inline-block">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Alerts;