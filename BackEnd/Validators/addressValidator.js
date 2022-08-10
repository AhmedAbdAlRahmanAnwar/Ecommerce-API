const {body} = require('express-validator');

module.exports = [
    body("payload.street").matches(/^[a-zA-Z0-9 ,]{3,}$/).withMessage("street should be a string"),
    body("payload.city").matches(/^[a-zA-Z]{3,}$/).withMessage("city should be a string"),
    body("payload.country").matches(/^[a-zA-Z]{3,}$/).withMessage("country should be a string"),
    body("payload.mobile").isMobilePhone().withMessage("mobile should be a number")
]