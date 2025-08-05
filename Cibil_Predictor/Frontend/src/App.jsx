import { Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CreditReportPreview from "./components/CreditReportPreview";
import AIAnalyzer from "./components/AIAnalyzer";
import Alerts from "./components/Alerts";
import MyAccount from "./components/Myacount";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-signup" element={<LoginSignup />} />
      
      {/* Redirect to login if not authenticated */}
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login-signup" />} />
      <Route path="/report" element={<CreditReportPreview />} />
      <Route path="/ai-analyzer" element={<AIAnalyzer />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/account" element={<MyAccount/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
