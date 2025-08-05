import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useNavigate } from "react-router-dom";
import {
  FileDown,
  Loader2,
  AlertCircle,
  BadgeCheck,
  Banknote,
  BarChart3,
} from "lucide-react";
import CibilScoreChart from "./Charts/CibilScoreChart";
import NavBar from "../components/NavBar";
import Footer from "./Footer";
import AccountMixChart from "./Charts/AccountMixChart";
import DebtPieChart from "./Charts/DebtPieChart";
import LoanTypePieChart from "./Charts/LoanTypePieChart";
import EMIBarChart from "./Charts/EMIBarChart";

const CreditReportPreview = () => {
  const [cibilData, setCibilData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const reportRef = useRef();

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

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save("Credit_Report.pdf");
  };

  return (
    <div>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
        {cibilData && !error && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200"
            >
              <FileDown className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div ref={reportRef} className="text-black">
          {cibilData ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
              <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center gap-2">
                <BadgeCheck className="text-green-600" />
                Credit Report Preview
              </h2>

              <CibilScoreChart score={cibilData.CIBIL_Score} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <DebtPieChart open={cibilData.Open_Loans} closed={cibilData.Closed_Loans} />
                <LoanTypePieChart loans={cibilData.Loans} />
                <EMIBarChart loans={cibilData.Loans} />
                <AccountMixChart loans={cibilData.Loans} />
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                <p><strong>PAN:</strong> {cibilData.pancard}</p>
                <p><strong>CIBIL Score:</strong> {cibilData.CIBIL_Score}</p>
                <p><strong>Total Loans:</strong> {cibilData.Total_Loans}</p>
                <p><strong>Open Loans:</strong> {cibilData.Open_Loans}</p>
                <p><strong>Closed Loans:</strong> {cibilData.Closed_Loans}</p>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Banknote className="text-blue-600" />
                  Loan Breakdown
                </h3>
                <ul className="space-y-4">
                  {cibilData.Loans?.map((loan, index) => (
                    <li
                      key={index}
                      className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
                    >
                      <p><strong>Company:</strong> {loan.Loan_Company}</p>
                      <p><strong>Type:</strong> {loan.Loan_Type}</p>
                      <p><strong>Amount Approved:</strong> ₹{loan.Loan_Amount_Approved}</p>
                      <p><strong>Amount Repaid:</strong> ₹{loan.Amount_Repaid}</p>
                      <p><strong>EMIs Left:</strong> {loan.EMIs_Left}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            !error && (
              <div className="flex items-center justify-center mt-10 gap-2 animate-pulse text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
                Loading Credit Report...
              </div>
            )
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreditReportPreview;