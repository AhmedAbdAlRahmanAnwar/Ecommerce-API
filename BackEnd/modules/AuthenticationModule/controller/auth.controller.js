const User = require('./../../UserModule/model/user.model');
const generateAuthToken = require('./../../../Utilities/generateJWTtoken');
const {sendWelcomeMail, sendForgetPasswordEmail} = require('./../../../Utilities/sendMail');

const login = function (request, response, next) {
    const {email, password} = request.body.payload;
    User.findOne({email})
        .then(async user => {
            if (user && await (user.matchPassword(password))) {
                const expire = "1d";
                const token = generateAuthToken(user, expire);
                response.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    address: user.address,
                    wishlist: user.wishlist,
                    userId:user["_id"],
                    token
                });
            } else {
                const error = new Error("Invalid email or password");
                error.status = 401;
                next(error);
            }
        })
        .catch(error => next(error))
}

const signup = function (request, response, next) {
    User.create(request.body.payload)
        .then(user => {
            if (user) {
                const expire = "1d";
                const token = generateAuthToken(user, expire);
                response.status(201).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    address: user.address,
                    wishlist: user.wishlist,
                    userId:user["_id"],
                    token
                });
                sendWelcomeMail(user.email);
            } else {
                const error = new Error("Invalid User data");
                error.status = 400;
                next(error);
            }
        })
        .catch(error => next(error))
}

const forgetPassword = (request, response, next) => {
    const email = request.body.email;
    User.findOne({email})
        .then(user => {
            if (user) {
                const expire = "10m";
                const forgetPasswordToken = generateAuthToken(user, expire);
                sendForgetPasswordEmail(user.email, forgetPasswordToken);
                user.resetPasswordToken = forgetPasswordToken;
                user.save();
                response.status(200).json({message: "Email sent"});
            } else {
                const error = new Error("User not found");
                error.status = 404;
                next(error);
            }
        })
        .catch(error => next(error))
}

const resetPassword = (request, response, next) => {
    const user = request.user;
    if (user.resetPasswordToken === request.token) {
        user.password = request.body.payload.password;
        user.resetPasswordToken = undefined;
        user.save()
            .then(() => response.status(200).json({message: "success"}))
            .catch(error => next(error));
    } else {
        const error = new Error("Invalid Link");
        error.status = 400;
        next(error);
    }
}

const changePassword = (request, response, next) => {
    const {oldPassword, newPassword} = request.body.payload;
    User.findById(request.id)
        .then(async user => {
            if (user) {
                if (await user.matchPassword(oldPassword)) {
                    user.password = newPassword;
                    await user.save()
                        .catch(error => next(error));
                    response.status(200).json({message: "password updated"})
                } else {
                    const error = new Error("Invalid Old Password");
                    error.status = 400;
                    next(error);
                }
            } else {
                const error = new Error("User Not Found");
                error.status = 404;
                next(error);
            }
        })
        .catch(error => next(error))
}

module.exports = {
    login,
    signup,
    forgetPassword,
    resetPassword,
    changePassword
};