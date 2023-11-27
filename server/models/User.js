const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"]
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            // regex for email pattern matching
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                'Please provide a valid email address'
            ]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 6,
            select: false
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,

    },
    {
        timestamps: true
    },
);


const User = mongoose.model('user', UserSchema);

module.exports = User;