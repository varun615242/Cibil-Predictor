import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { FaUpload, FaTrash, FaSignOutAlt, FaKey, FaUserEdit } from "react-icons/fa";

const MyAccount = () => {
  const [user, setUser] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setImagePreview(res.data.profilePic ? `http://localhost:5000/uploads/${res.data.profilePic}` : null);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      await axios.put("http://localhost:5000/api/auth/update-profile-pic", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile picture uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password changed!");
      setNewPassword("");
      setShowChangePassword(false);
    } catch (err) {
      alert("Error updating password");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        await axios.delete("http://localhost:5000/api/auth/delete", {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Account deleted");
        navigate("/signup");
      } catch (err) {
        console.error(err);
        alert("Error deleting account");
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full border-4 border-blue-400 overflow-hidden shadow-md">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
              )}
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow"
              onClick={handleUpload}
            >
              <FaUpload /> Upload Picture
            </button>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">My Account</h2>
            <p className="text-gray-600">Username: <span className="font-semibold">{user.username}</span></p>
            <p className="text-gray-600">Email: <span className="font-semibold">{user.email}</span></p>
            {user.pancard && (
              <p className="text-gray-600">PAN Card: <span className="font-semibold">{user.pancard}</span></p>
            )}
          </div>

          {showChangePassword ? (
            <div className="flex flex-col items-center space-y-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleChangePassword}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
              >
                <FaKey /> Change Password
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowChangePassword(true)}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full mx-auto"
            >
              <FaUserEdit /> Change Password
            </button>
          )}

          <button
            onClick={handleDeleteAccount}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full mx-auto"
          >
            <FaTrash /> Delete Account
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-full mx-auto"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;