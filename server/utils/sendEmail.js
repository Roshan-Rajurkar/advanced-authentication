const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
        return info;
    } catch (error) {
        console.error('Email failed to send:', error);
        throw error;
    }
};

module.exports = sendEmail;
