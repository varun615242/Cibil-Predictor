const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PanCard = require("../models/PanCard");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });

// ✅ Signup
router.post("/signup", async (req, res) => {
  const { username, email, password, pancard } = req.body;

  try {
    const existing = await PanCard.findOne({ pancard });
    if (!existing) return res.status(400).json({ error: "PAN card not found" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, pancard });
    await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt:", email); // ✅ Add this

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Password does not match");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, pancard: user.pancard },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login error" });
  }
});


// ✅ Get User Profile
router.get("/profile", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);
});

// ✅ Change Password
router.put("/change-password", verifyToken, async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.findByIdAndUpdate(req.user.userId, { password: hashed });
  res.json({ message: "Password updated" });
});

// ✅ Delete Account
router.delete("/delete", verifyToken, async (req, res) => {
  await User.findByIdAndDelete(req.user.userId);
  res.json({ message: "Account deleted" });
});

// ✅ Update Profile Picture (File upload)
router.put("/update-profile-pic", verifyToken, upload.single("profilePic"), async (req, res) => {
  if (req.file) {
    const profilePicPath = req.file.filename;
    await User.findByIdAndUpdate(req.user.userId, { profilePic: profilePicPath });
    res.json({ message: "Profile picture updated" });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

// ✅ Forgot Password (via email & pancard)
router.post("/forgot-password", async (req, res) => {
  const { email, pancard } = req.body;

  try {
    const user = await User.findOne({ email, pancard });
    if (!user) return res.status(404).json({ error: "Invalid email or PAN" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Reset Password via Token
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashed });
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});





module.exports = router;
