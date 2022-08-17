const {body} = require('express-validator');

const validateEmail = body("payload.email", "Invalid Email Format").isEmail();

const validatePassword = body().custom(({payload}) => {
    const regex = /^(?=.*([A-Z])+)(?=.*[!@#$&*]+)(?=.*[0-9]+)(?=.*[a-z]+).{8,}$/;
    if (payload["password"] && !payload["oldPassword"]){
        return regex.test(payload["password"]);
    }
    if (payload["oldPassword"] && payload["newPassword"] && !payload["password"]) {
        return regex.test(payload["newPassword"]);
    }
}).withMessage("Invalid Password Format")

module.exports = {
    validateEmail,
    validatePassword
};

