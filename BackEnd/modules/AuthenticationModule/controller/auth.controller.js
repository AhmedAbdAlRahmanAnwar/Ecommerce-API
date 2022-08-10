const User = require('./../../UserModule/model/user.model');
const generateAuthToken = require('./../../../Utilities/generateJWTtoken');
const {sendWelcomeMail, sendForgetPasswordEmail} = require('./../../../Utilities/sendMail');
const errorHandler = require('./../../../Utilities/errorHandler');

const login = function (request, response, next) {
    const {email, password} = request.body.payload;
    User.findOne({email})
        .populate([
            {path: "wishlist.product", populate: {path: "category", select: "categoryName"}},
            {path: "wishlist.product", populate: {path: "reviews.user", select: "firstName lastName -_id"}}
        ])

        .then(async user => {
            if (user && await (user.matchPassword(password))) {
                const expire = "1d";
                const token = generateAuthToken(user["_id"], expire);
                user.isLoggedIn = true;
                user.save()
                    .then(() => {
                        response.status(200).json({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            address: user.address,
                            wishlist: user.wishlist,
                            token
                        });
                    })
            } else {
                errorHandler("Invalid email or password", 401, next)
            }
        })
        .catch(error => errorHandler(error, 400, next))
}

const signup = function (request, response, next) {
    const {firstName, lastName, email, password} = request.body.payload;
    User.create({firstName, lastName, email, password})
        .then(user => {
            if (user) {
                sendWelcomeMail(user.email);
                const expire = "1d";
                const token = generateAuthToken(user["_id"], expire)
                user.isLoggedIn = true;
                user.save().then(() => {
                    response.status(201).json({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        address: user.address,
                        wishlist: user.wishlist,
                        token
                    });
                })
            }
        })
        .catch(error => errorHandler(error.message, 422, next))
}

const forgetPassword = (request, response, next) => {
    const email = request.body.payload.email;
    User.findOne({email})
        .then(user => {
            if (user) {
                const expire = "5m";
                const forgetPasswordToken = generateAuthToken(user["_id"], expire);
                sendForgetPasswordEmail(user.email, forgetPasswordToken);
                user.resetPasswordToken = forgetPasswordToken;
                user.save();
                response.status(200).json({message: "Email sent"});
            } else {
                errorHandler("User not found", 404, next)
            }
        })
        .catch(error => errorHandler(error, 400, next))
}

const resetPassword = (request, response, next) => {
    const user = request.user;
    if (user.resetPasswordToken === request.token) {
        user.password = request.body.payload.password;
        user.resetPasswordToken = undefined;
        user.save()
            .then(() => response.status(200).json({message: "success"}))
            .catch(() => errorHandler("Invalid Password Format", 422, next));
    } else {
        errorHandler("Invalid Link", 400, next);
    }
}

const changePassword = async (request, response, next) => {
    const {oldPassword, newPassword} = request.body.payload;
    const user = request.user;

    if (await user.matchPassword(oldPassword)) {
        user.password = newPassword;
        user.save()
            .then(() => response.status(200).json({message: "password updated"}))
            .catch(() => errorHandler("Invalid Password Format", 422, next))
    } else {
        errorHandler("Invalid Old Password", 400, next)
    }
}

module.exports = {
    login,
    signup,
    forgetPassword,
    resetPassword,
    changePassword
};