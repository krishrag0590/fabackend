const nodemailer = require('nodemailer');

async function sendEmail(email, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'devrag0507@gmail.com',
                pass: 'wkmf nfba egou psox'
            }
        });
        
        const mailOptions = {
            from: {
                name: 'Test Mail',
                address: 'devrag0507@gmail.com'
            },
            to: email,
            subject: 'FashionAvenue.com email verification',
            text: text
        };
        
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                return {message: 'retry'}
            } else {
                console.log('Email sent: ' + info.response);
                return {message: 'success'}
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({message: err.message, flag: 0});
    }
}

module.exports = {
    "adminEmail" : 'admin@fashionavenue.com',
    "dbURI": "mongodb+srv://admin1:admin1@fashion-avenue.v5ksg.mongodb.net/?retryWrites=true&w=majority&appName=fashion-avenue",
    "baseURL": "http://localhost:3000/",
    "sendEmail": sendEmail,
    "baseUrlAPI": "http://localhost:5005/"
}