const { decrypt } = require('dotenv');
const User = require('../models/User')

const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            user: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            status: false,
            message: 'Please provide the credentials'
        });
    }

    try {
        const availableUser = await User.findOne({ email }).select('+password');
        if (!availableUser) {
            res.status(404).json({
                status: false,
                message: 'Invalid credentials'
            });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, availableUser.password);

        if (passwordMatch) {
            res.status(200).json({
                status: true,
                token: '123456789'
            });
        } else {
            res.status(401).json({
                status: false,
                message: 'Invalid password'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const forgotpassword = (req, res, next) => {
    res.send("forgot password route")
}

const resetpassword = (req, res, next) => {
    res.send("reset password route")
}

module.exports = { register, login, forgotpassword, resetpassword }