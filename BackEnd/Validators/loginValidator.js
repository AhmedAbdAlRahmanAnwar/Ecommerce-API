const {body} = require('express-validator');

const validateLogin = [
    body("payload.email").isEmail().withMessage("Invalid email format"),
    body("payload.password")
        .isString().withMessage("user password should be a string")
        .isLength({min: 6}).withMessage("user password should has minimum length of 6 characters"),
]

module.exports = validateLogin;