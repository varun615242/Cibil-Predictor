import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "./Footer";

import CibilScoreChart from "./Charts/CibilScoreChart";
import AccountMixChart from "./Charts/AccountMixChart";
import DebtPieChart from "./Charts/DebtPieChart";
import LoanTypePieChart from "./Charts/LoanTypePieChart";
import EMIBarChart from "./Charts/EMIBarChart";

const Dashboard = () => {
  const [cibilData, setCibilData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication error: Token not found.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/cibil/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCibilData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pancard");
    localStorage.removeItem("cibilData");
    navigate("/");
  };

  return (
    <div>
      <NavBar />

      <div className="text-white p-6 md:p-10 min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
        {error && <p className="text-red-500 font-semibold text-lg text-center">{error}</p>}

        {cibilData ? (
          <div className="bg-white text-black rounded-3xl mt-6 shadow-lg p-6 md:p-10">
            <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
              📊 Credit Dashboard
            </h2>

            <div className="flex justify-center">
              <CibilScoreChart score={cibilData.CIBIL_Score} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <DebtPieChart open={cibilData.Open_Loans} closed={cibilData.Closed_Loans} />
              <LoanTypePieChart loans={cibilData.Loans} />
              <EMIBarChart loans={cibilData.Loans} />
              <AccountMixChart loans={cibilData.Loans} />
            </div>

            {/* Loan Breakdown */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                💼 Loan Details
              </h2>
              <ul className="space-y-4">
                {cibilData.Loans?.map((loan, index) => (
                  <li key={index} className="border border-purple-200 bg-purple-50 p-4 rounded-lg shadow">
                    <p><strong>🏢 Company:</strong> {loan.Loan_Company}</p>
                    <p><strong>📂 Type:</strong> {loan.Loan_Type}</p>
                    <p><strong>💰 Amount Approved:</strong> ₹{loan.Loan_Amount_Approved}</p>
                    <p><strong>💸 Amount Repaid:</strong> ₹{loan.Amount_Repaid}</p>
                    <p><strong>📆 EMIs Left:</strong> {loan.EMIs_Left}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              >
                🔒 Logout
              </button>
            </div>
          </div>
        ) : (
          !error && <p className="text-center mt-10 text-xl animate-pulse">⏳ Loading CIBIL data...</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;