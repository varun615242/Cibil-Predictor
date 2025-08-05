import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import axios from 'axios';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up");
    const [formData, setFormData] = useState({ username: "", email: "", password: "", pancard: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setMessage("");
        const url = action === "Sign Up"
            ? "http://localhost:5000/api/auth/signup"
            : "http://localhost:5000/api/auth/login";

        try {
            const response = await axios.post(url, formData);
            setMessage(response.data.message);

            if (action === "Login") {
                localStorage.setItem("token", response.data.token);

                const config = {
                    headers: {
                        Authorization: `Bearer ${response.data.token}`
                    }
                };

                const cibilRes = await axios.get(`http://localhost:5000/api/cibil/data`, config);

                localStorage.setItem("cibilData", JSON.stringify(cibilRes.data));
                navigate('/dashboard');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 px-4">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-indigo-800 tracking-wide">{action === "Login" ? "🔐 Login" : "📝 Sign Up"}</h2>
                    <div className="w-16 h-1 bg-indigo-800 mx-auto mt-2 rounded-full"></div>
                </div>

                <div className="space-y-4">
                    {action === "Sign Up" && (
                        <>
                            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 ring-indigo-500">
                                <img src={user_icon} alt="user" className="w-5 h-5 mr-3" />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="👤 Full Name"
                                    className="w-full bg-transparent outline-none text-gray-700"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 ring-indigo-500">
                                <img src={user_icon} alt="pancard" className="w-5 h-5 mr-3" />
                                <input
                                    type="text"
                                    name="pancard"
                                    placeholder="🧾 PAN Card Number"
                                    className="w-full bg-transparent outline-none text-gray-700"
                                    value={formData.pancard}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 ring-indigo-500">
                        <img src={email_icon} alt="email" className="w-5 h-5 mr-3" />
                        <input
                            type="email"
                            name="email"
                            placeholder="📧 Email"
                            className="w-full bg-transparent outline-none text-gray-700"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 ring-indigo-500">
                        <img src={password_icon} alt="password" className="w-5 h-5 mr-3" />
                        <input
                            type="password"
                            name="password"
                            placeholder="🔒 Password"
                            className="w-full bg-transparent outline-none text-gray-700"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {action === "Login" && (
                    <div className="text-right mt-2 text-sm text-gray-500">
                        Forgot Password? <span className="text-indigo-700 cursor-pointer hover:underline" onClick={() => navigate("/forgot-password")}>Click Here</span>
                    </div>
                )}

                {message && <p className="text-center mt-4 text-red-600 font-semibold">{message}</p>}

                <div className="mt-6 flex justify-between">
                    <button
                        className={`w-1/2 mr-2 py-2 rounded-full font-bold text-white ${action === "Sign Up" ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-600 transition"}`}
                        onClick={() => setAction("Sign Up")}
                    >
                        📝 Sign Up
                    </button>

                    <button
                        className={`w-1/2 ml-2 py-2 rounded-full font-bold text-white ${action === "Login" ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-600 transition"}`}
                        onClick={() => setAction("Login")}
                    >
                        🔐 Login
                    </button>
                </div>

                <button
                    className="w-full mt-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-transform hover:scale-105 duration-200 shadow-lg"
                    onClick={handleSubmit}
                >
                    {action === "Login" ? "🚪 Login" : "🚀 Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default LoginSignUp;
