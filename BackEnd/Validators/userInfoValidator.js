const {body} = require('express-validator');

module.exports = [
    body("payload").exists().withMessage("No Data Provided"),
    body("payload.firstName").optional()
        .isString().withMessage("First Name should be a string")
        .matches(/^\w{3,}$/g)
        .withMessage("First Name should has minimum length of 3 characters"),
    body("payload.lastName").optional()
        .isString().withMessage("Last Name should be a string")
        .matches(/^\w{3,}$/g)
        .withMessage("Last Name should has minimum length of 3 characters"),
    body("payload.newEmail").optional()
        .isEmail().withMessage("Invalid email format")
]