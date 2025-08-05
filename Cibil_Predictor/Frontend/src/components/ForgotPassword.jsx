import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [pancard, setPancard] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
        pancard,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-900 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-indigo-800 tracking-wide">🔑 Forgot Password</h2>
          <p className="text-sm text-gray-500 mt-1">Reset your access securely</p>
          <div className="w-16 h-1 bg-indigo-800 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 ring-indigo-500">
            <span className="text-gray-500 mr-3">📧</span>
            <input
              type="email"
              placeholder="Registered Email"
              className="w-full bg-transparent outline-none text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 ring-indigo-500">
            <span className="text-gray-500 mr-3">🧾</span>
            <input
              type="text"
              placeholder="PAN Card Number"
              className="w-full bg-transparent outline-none text-gray-700"
              value={pancard}
              onChange={(e) => setPancard(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-transform hover:scale-105 duration-200 shadow-lg"
        >
          📤 Send Reset Link
        </button>

        {message && (
          <p className="mt-5 text-center text-sm font-medium text-purple-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;