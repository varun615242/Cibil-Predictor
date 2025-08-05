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
    <div className="min-h-screen flex items-center justify-center bg-purple-800">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4 text-purple-800">Forgot Password</h2>
        <input
          type="email"
          placeholder="Registered Email"
          className="w-full border mb-2 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="PAN Card Number"
          className="w-full border mb-2 p-2"
          value={pancard}
          onChange={(e) => setPancard(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-sm text-center text-purple-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
