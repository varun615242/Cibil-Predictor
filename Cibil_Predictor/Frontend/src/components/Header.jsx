// src/Header.jsx
import React from 'react';
import Button from './Button';

const Header = () => {
  return (
    <header className="flex bg-gray-800 text-white p-4 flex justify-between items-center rounded-xl">
      <div className=" flex items-centre space-x-4 text-2xl font-bold font-serif">
      <img src="/logo.jpeg" alt="Logo" className="w-13 h-12 object-cover rounded-full border-2" />
        <h2>AI-powered cibil system</h2>
        </div>
      <Button/>
    </header>
  );
};

export default Header;
