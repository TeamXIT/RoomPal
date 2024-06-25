const User = require('../models/userModel');
const { baseResponses } = require('../helpers/baseResponses');

const Register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            mobileNumber,
            dateOfBirth,
            gender,
            lookingForRoom,
            lookingForRoommate,  // Use consistent field name
            preferences,
            makeMobilePrivate,
            password,
            confirmPassword
        } = req.body;

        // Validate required fields
        if (!fullName || !email || !mobileNumber || !dateOfBirth || !gender || 
            lookingForRoom === undefined || lookingForRoommate === undefined || 
            !password || !confirmPassword) {
            return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED);
        }

        // Validate password match
        if (password !== confirmPassword) {
            return res.status(400).json(baseResponses.constantMessages.PASSWORD_MISMATCH());
        }

        // Normalize gender value
        gender = gender.toLowerCase();

        // Create new user
        const newUser = new User({
            fullName,
            email,
            mobileNumber,
            dateOfBirth,
            gender: gender,
            lookingForRoom,
            lookingForRoommate,  // Use consistent field name
            preferences,
            makeMobilePrivate,
            password
        });

        // Save new user to database
        await newUser.save();

        return res.status(200).json(baseResponses.constantMessages.USER_REGISTERED());
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};

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

        // Validate password
        if (user.password !== password) {
            return res.status(400).json(baseResponses.constantMessages.INVALID_PASSWORD());
        }

        return res.status(200).json(baseResponses.constantMessages.USER_LOGGED_IN());
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};

module.exports = { Register, SignIn };
