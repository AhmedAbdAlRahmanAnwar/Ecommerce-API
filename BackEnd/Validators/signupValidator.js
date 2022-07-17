const {body} = require('express-validator');
const User = require('./../modules/UserModule/model/user.model');

const checkIfEmailExists = email => {
    return User.findOne({email})
        .then(user => {
            if (user) throw new Error('User Already exists');
        })
}

module.exports = [
    body("payload.firstName")
        .isString().withMessage("First Name should be a string")
        .isLength({min: 3}).withMessage("First Name should has minimum length of 3 characters"),
    body("payload.lastName")
        .isString().withMessage("Last Name should be a string")
        .isLength({min: 3}).withMessage("Last Name should has minimum length of 3 characters"),
    body("payload.email")
        .isEmail().withMessage("Invalid email format")
        .custom(email => checkIfEmailExists(email)),
    body("payload.password")
        .isString().withMessage("user password should be a string")
        .isLength({min: 6}).withMessage("user password should has minimum length of 6 characters"),
]