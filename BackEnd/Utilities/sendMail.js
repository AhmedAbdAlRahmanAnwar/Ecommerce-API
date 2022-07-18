const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');

const sendMail = userEmail => {
    const mailer = nodemailer.createTransport(transport({
        auth: {
            api_key: process.env.SENDGRID_API_KEY
        }
    }));

    const email = {
        to: userEmail,
        from: 'ahmedabdalrahman61@gmail.com',       //put here your email (must be verified by sendGrid)
        subject: 'Bazaar Shop',
        html: '<h1>Welcome to Bazaar Shop for Buying and selling Antiques</h1>'
    };

    mailer.sendMail(email);
}

module.exports = sendMail;