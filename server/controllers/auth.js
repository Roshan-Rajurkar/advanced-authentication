// here all authentication routes functions are implemented
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
        // console.log(savedUser)

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


const login = (req, res, next) => {
    res.send("login route")
}

const forgotpassword = (req, res, next) => {
    res.send("forgot password route")
}

const resetpassword = (req, res, next) => {
    res.send("reset password route")
}

module.exports = { register, login, forgotpassword, resetpassword }