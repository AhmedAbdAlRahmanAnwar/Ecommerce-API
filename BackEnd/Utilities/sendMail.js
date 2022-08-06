const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');

const mailer = nodemailer.createTransport(transport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
}));

const sendWelcomeMail = userEmail => {

    const email = {
        to: userEmail,
        from: process.env.EMAIL,       //put here your email (must be verified by sendGrid)
        subject: 'Bazaar Shop',
        html: '<h1>Welcome to Bazaar Shop for Buying and selling Antiques</h1>'
    };

    mailer.sendMail(email);
}

const sendForgetPasswordEmail = (userEmail, token) => {
    const email = {
        to: userEmail,
        from: process.env.EMAIL,       //put here your email (must be verified by sendGrid)
        subject: 'Reset password',
        html: `<body>
                    <p>Click to set a new password : 
                        <a href="${process.env.CLIENT}/resetPassword/${token}">Reset password</a>
                    </p>
               </body>`
    };

    mailer.sendMail(email);
}

module.exports = {
    sendWelcomeMail,
    sendForgetPasswordEmail
};