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
        .matches(/^\w{3,}$/g)
        .withMessage("First Name should has minimum length of 3 characters"),
    body("payload.lastName")
        .isString().withMessage("Last Name should be a string")
        .matches(/^\w{3,}$/g)
        .withMessage("Last Name should has minimum length of 3 characters"),
    body("payload.email")
        .isEmail().withMessage("Invalid email format")
        .custom(email => checkIfEmailExists(email)),
    body("payload.password")
        .matches(/^(?=.*([A-Z])+)(?=.*[!@#$&*]+)(?=.*[0-9]+)(?=.*[a-z]+).{8,}$/g)
        .withMessage("Invalid Password Format")
]