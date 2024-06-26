const express = require('express');
const { Register, SignIn, forgotPassword, resetPassword } = require('../controllers/authController');
const router = express.Router();
router.post('/register',Register);
router.post('/signIn',SignIn);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword',resetPassword);
module.exports = router;
