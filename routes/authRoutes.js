// ==========================
// 📦 IMPORTS & DEPENDENCIES
// ==========================

// Packages
const express = require('express');

// Controllers
const authController = require('../controllers/authController.js');

// Middleware
const {
  authenticateUser,
} = require('../middleware/authenticationMiddleware.js');

// ==========================
// 🚏 ROUTER SETUP
// ==========================

const router = express.Router();

// ==========================
// 🛣️ AUTH ROUTES
// ==========================

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
router.post('/register', authController.register);

/**
 * @desc    Verify user's email
 * @route   POST /api/v1/auth/verify-email
 * @access  Public
 */
router.post('/verify-email', authController.verifyEmail);

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @desc    Logout user
 * @route   GET /api/v1/auth/logout
 * @access  Public
 */
router.delete('/logout', authenticateUser, authController.logout);

router.post('/forget-password', authController.fotgetPassword);
router.post('/reset-password', authController.resetPassword);

// ==========================
// 📤 EXPORT ROUTER
// ==========================

module.exports = router;
