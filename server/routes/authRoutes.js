const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  getDashboard,
  logout,
  deleteAccount,
  updateProfile, // Add this import
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

// Validation rules
const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const updateProfileValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/dashboard", auth, getDashboard);
router.post("/logout", auth, logout);
router.delete("/delete-account", auth, deleteAccount);
router.put("/update-profile", auth, updateProfileValidation, updateProfile); // Add this route

module.exports = router;
