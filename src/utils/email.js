const nodemailer = require('nodemailer')
const {GMAIL_EMAIL,GMAIL_PASSWORD} = require("../config/globals")

const sendEmail = async ({addressee,subjectEmail,textEmail}) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: GMAIL_EMAIL,
            pass: GMAIL_PASSWORD   
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    const mailBody = {
        from: GMAIL_EMAIL,
        to: addressee,
        subject: subjectEmail,
        text: textEmail
    }
    return transporter.sendMail(mailBody)
}

module.exports = sendEmail;