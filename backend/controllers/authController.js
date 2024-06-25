const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { baseResponses } = require('../helpers/baseResponses');

const SignIn = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;

        // Validate required fields
        if (!mobileNumber || !password) {
            return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
        }

        // Find user by mobile number
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(400).json(baseResponses.constantMessages.USER_NOT_FOUND());
        }

        if (user.password !== password) {
            return res.status(400).json(baseResponses.constantMessages.INVALID_PASSWORD());
        }

        let _secret = process.env.JWT_SECRET || 'rajasekhar-secret-key'; // Ensure this key is correct and secure
        const token = jwt.sign({ mobileNumber }, _secret, { expiresIn: '1h' });

        return res.status(200).json(baseResponses.constantMessages.USER_LOGGED_IN(token));
    } catch (error) {
        console.error("SignIn error:", error); // Log error for debugging
        return res.status(500).json(baseResponses.error(error.message));
    }
};

module.exports = { Register, SignIn };
