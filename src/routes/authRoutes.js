// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, verifyEmail, verifyPhone } = require('../controllers/authControllers');
const { validateRegister } = require('../validators/validation');

router.post('/register', validateRegister, register);
router.post('/verify-email', verifyEmail);
router.post('/verify-phone', verifyPhone);

module.exports = router;
