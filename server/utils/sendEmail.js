const nodemailer = require('nodemailer')
require('dotenv').config();
const sendEmail = (options) => {
    const transponder = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.test
    }


    transponder.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err)
        else console.log(info)
    })
}

module.exports = sendEmail;