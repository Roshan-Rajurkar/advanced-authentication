const User = require('../models/User')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

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

        if (savedUser) {
            const token = jwt.sign({ username: newUser.username, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

            res.status(200).json({
                status: true,
                token,
                username: newUser.username,
                id: newUser._id
            });
        }

    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: 'Please provide both email and password',
        });
    }

    try {
        const availableUser = await User.findOne({ email }).select('+password');

        if (!availableUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found. Please check your email or register.',
            });
        }

        const passwordMatch = await bcrypt.compare(password, availableUser.password);

        if (passwordMatch) {
            const token = jwt.sign(
                { username: availableUser.username, id: availableUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                status: true,
                token,
                username: availableUser.username,
                id: availableUser._id,
            });
        } else {
            return res.status(401).json({
                status: false,
                message: 'Invalid password. Please check your password.',
            });
        }
    } catch (error) {
        next(error);
    }
};


const forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return next(new ErrorResponse('Email could not be sent', 404));

        const resetToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '30m' });

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

        await user.save();

        const resetUrl = `http://localhost:${process.env.FrontEND_PORT}/api/auth/resetpassword/${resetToken}`;

        const html = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password⬇️</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
        const text = 'Hii,';

        try {
            const info = await sendEmail({
                to: user.email,
                subject: 'Password reset request',
                text,
                html,
            });

            res.status(200).json({ success: true, data: { info } });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse('Email could not be sent', 500));
        }
    } catch (error) {
        next(error);
    }
};

const resetpassword = async (req, res, next) => {
    const resetPasswordToken = req.params.resetPasswordToken;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        }).select('+password');

        if (!user) {
            return next(new ErrorResponse('Invalid or expired reset token', 400));
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);

        if (isSamePassword) {
            return next(new ErrorResponse('Password recently used', 400));
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password Updated" });

    } catch (error) {
        console.error('Error updating password:', error);

        return next(new ErrorResponse('Password could not be updated', 500));
    }
};


module.exports = { register, login, forgotpassword, resetpassword }