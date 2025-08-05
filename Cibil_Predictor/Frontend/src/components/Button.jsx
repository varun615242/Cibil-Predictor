// src/Button.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/login-signup")}
      className="py-2 px-4 rounded-xl italic font-serif font-medium hover:bg-sky-800 bg-sky-500 focus:outline-none focus:ring-4 focus:ring-offset-2 transition duration-100 ease-in-out"
    >
      Login/Register
    </button>
  );
};

export default Button;
