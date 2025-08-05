import React from "react";

const Footer = () => {
  return (
    <footer className="text-white text-center text-lg-start" style={{ backgroundColor: "#2d3b44" }}>
      {/* Top Social Bar */}
      <div className="flex justify-between items-center px-6 py-4" style={{ backgroundColor: "#6351ce" }}>
        <span className="text-sm text-white">Get connected with us on social networks:</span>
        <div className="flex space-x-6 text-white text-2xl">
          <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-red-500 transition-colors"><i className="fab fa-google"></i></a>
          <a href="#" className="hover:text-pink-500 transition-colors"><i className="fab fa-instagram"></i></a>
          <a href="#" className="hover:text-blue-600 transition-colors"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="hover:text-gray-500 transition-colors"><i className="fab fa-github"></i></a>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {/* Company Info */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-xl">Cibil System</h6>
            <hr className="w-16 border-t-2 border-purple-500 mb-4" />
            <p className="text-sm">
              "Your trusted companion for credit score tracking, loan predictions, and smart financial planning — all in one place."
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-xl">Useful Links</h6>
            <hr className="w-16 border-t-2 border-purple-500 mb-4" />
            <p><a href="#" className="text-white hover:text-purple-500 transition-colors">Your Account</a></p>
            <p><a href="#" className="text-white hover:text-purple-500 transition-colors">Become an Affiliate</a></p>
            <p><a href="#" className="text-white hover:text-purple-500 transition-colors">Shipping Rates</a></p>
            <p><a href="#" className="text-white hover:text-purple-500 transition-colors">Help</a></p>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-xl">Contact</h6>
            <hr className="w-16 border-t-2 border-purple-500 mb-4" />
            <p className="text-sm"><i className="fas fa-home mr-2"></i> Gandipet, Hyderabad</p>
            <p className="text-sm"><i className="fas fa-envelope mr-2"></i> Cibilsystem@gmail.com</p>
            <p className="text-sm"><i className="fas fa-phone mr-2"></i> +02 234 907 89</p>
            <p className="text-sm"><i className="fas fa-print mr-2"></i> +01 234 567 89</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        <span className="text-white text-sm">© 2025 Copyright:</span>
        <a className="text-white font-semibold ml-1 hover:text-purple-500 transition-colors">AI Powered Cibil System</a>
      </div>
    </footer>
  );
};

export default Footer;