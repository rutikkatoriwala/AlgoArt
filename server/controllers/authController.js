const User = require("../model/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
exports.register = async (req, res) => {
  try {
    const { fullName, email, enrollmentNo, password, role, teamId } = req.body;

    // Validation
    if (!fullName || !email || !enrollmentNo || !password || !role) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { enrollmentNo }] });
    if (user) {
      return res.status(400).json({ message: "User already exists with this email or enrollment number" });
    }

    // Create new user
    user = new User({
      fullName,
      email,
      enrollmentNo,
      password,
      role,
      teamId: role === "owner" ? teamId : null,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        enrollmentNo: user.enrollmentNo,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route   POST /api/auth/login
// @desc    Login user with email/enrollment and password
// @access  Public
exports.login = async (req, res) => {
  try {
    const { emailOrEnrollment, password } = req.body;

    // Validation
    if (!emailOrEnrollment || !password) {
      return res.status(400).json({ message: "Please provide email/enrollment number and password" });
    }

    // Find user by email or enrollment number
    const user = await User.findOne({
      $or: [{ email: emailOrEnrollment }, { enrollmentNo: emailOrEnrollment }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: "Your account has been deactivated" });
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        enrollmentNo: user.enrollmentNo,
        role: user.role,
        teamId: user.teamId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route   GET /api/auth/verify
// @desc    Verify token and get user data
// @access  Private
exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Token verified",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        enrollmentNo: user.enrollmentNo,
        role: user.role,
        teamId: user.teamId,
      },
    });
  } catch (error) {
    console.error("Verify token error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
