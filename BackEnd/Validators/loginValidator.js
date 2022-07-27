const {body} = require('express-validator');

const validateEmail = body("payload.email", "Invalid email format").isEmail();

const validatePassword = body().custom(({payload}) => {
    const regex = /^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,}$/;
    if (payload["oldPassword"]) {
        return payload["password"] ? regex.test(payload["password"]) : regex.test(payload["newPassword"]);
    }
}).withMessage("Invalid Password Format")

module.exports = {
    validateEmail,
    validatePassword
};

