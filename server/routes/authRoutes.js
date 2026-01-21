const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyToken,
} = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Private routes
router.get("/verify", isAuthenticated, verifyToken);

module.exports = router;
