const {body} = require('express-validator');

const validateEmail = body("payload.email", "Invalid email or password").isEmail();

const validatePassword = body().custom(({payload}) => {
    const regex = /^(?=.*([A-Z])+)(?=.*[!@#$&*]+)(?=.*[0-9]+)(?=.*[a-z]+).{8,}$/;
    if (payload["oldPassword"]) {
        return payload["password"] ? regex.test(payload["password"]) : regex.test(payload["newPassword"]);
    }
}).withMessage("Invalid email or password")

module.exports = {
    validateEmail,
    validatePassword
};

