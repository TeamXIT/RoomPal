const express = require('express');
const { Register, SignIn } = require('../controllers/authController');
const router = express.Router();
router.post('/register',Register);
router.post('/signIn',SignIn);
module.exports = router;
