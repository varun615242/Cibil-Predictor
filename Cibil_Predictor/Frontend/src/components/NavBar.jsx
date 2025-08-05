import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ onLogout }) => {
    
  return (
    <nav className="bg-lime shadow-md px-8 py-4 flex justify-between items-center text-purple-800 rounded-full">
      <div className="text-2xl font-bold">📊 CIBIL Dashboard</div>

      <div className="space-x-6 text-sm font-semibold">
        <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "text-indigo-600 underline" : "hover:text-indigo-600"}>
          Dashboard
        </NavLink>
        <NavLink to="/ai-analyzer" className={({ isActive }) => isActive ? "text-indigo-600 underline" : "hover:text-indigo-600"}>
          AI Analyzer
        </NavLink>
        <NavLink to="/report" className={({ isActive }) => isActive ? "text-indigo-600 underline" : "hover:text-indigo-600"}>
          Report
        </NavLink>
        <NavLink to="/alerts" className={({ isActive }) => isActive ? "text-indigo-600 underline" : "hover:text-indigo-600"}>
          Alerts
        </NavLink>
        <NavLink to="/account" className={({ isActive }) => isActive ? "text-indigo-600 underline" : "hover:text-indigo-600"}>
          My Account
        </NavLink>
        
      </div>
    </nav>
  );
};

export default NavBar;
