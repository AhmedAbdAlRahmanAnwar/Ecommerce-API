const {body} = require('express-validator');

const passwordValidator = [
    body('payload.newPassword')
        .isString().withMessage("user password should be a string")
        .isLength({min: 8}).withMessage("user password should has minimum length of 8 characters")
]

module.exports = passwordValidator;