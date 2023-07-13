const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Route: POST /api/auth/signup
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  authController.signup
);

// Route: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
