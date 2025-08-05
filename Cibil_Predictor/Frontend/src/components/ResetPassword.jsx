import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4 text-purple-800">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full border mb-2 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded"
        >
          Reset
        </button>
        {message && <p className="mt-4 text-sm text-center text-purple-600">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
