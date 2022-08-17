const User = require('./../../UserModule/model/user.model');
const generateAuthToken = require('./../../../Utilities/generateJWTtoken');
const {sendWelcomeMail, sendForgetPasswordEmail} = require('./../../../Utilities/sendMail');
const errorHandler = require('./../../../Utilities/errorHandler');

const login = function (request, response, next) {
    const {email, password} = request.body.payload;
    User.findOne({email})
        .populate({path: "wishlist.product", select: "_id name price rating image"})
        .then(async user => {
            if (user && await (user.matchPassword(password))) {
                const expire = "5h";
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
        .catch(error => errorHandler(error.message, 400, next))
}

const signup = function (request, response, next) {
    const {firstName, lastName, email, password} = request.body.payload;
    User.create({firstName, lastName, email, password})
        .then(user => {
            if (user) {
                sendWelcomeMail(user.email);
                const expire = "5h";
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
            if (!user) {
                errorHandler("User not found", 404, next);
                return;
            }
            const expire = "5m";
            const forgetPasswordToken = generateAuthToken(user["_id"], expire);
            sendForgetPasswordEmail(user.email, forgetPasswordToken);
            user.resetPasswordToken = forgetPasswordToken;
            user.save();
            response.status(200).json({message: "Email sent successfully"});
        })
        .catch(error => errorHandler(error.message, 400, next))
}

const resetPassword = (request, response, next) => {
    const user = request.user;
    if (!request.body.payload.password) {
        errorHandler("Invalid email or password", 422, next);
        return;
    }
    user.password = request.body.payload.password;
    user.resetPasswordToken = "";
    user.save()
        .then(() => response.status(200).json({message: "Password changed successfully."}))
}

const changePassword = async (request, response, next) => {
    const {oldPassword, newPassword} = request.body.payload;
    const user = request.user;
    if (!oldPassword && !newPassword) {
        errorHandler("Old and new Passwords are Required", 400, next);
        return;
    }
    if (await user.matchPassword(oldPassword)) {
        user.password = newPassword;
        user.save()
            .then(() => response.status(200).json({message: "Password updated successfully."}))
            .catch(() => errorHandler("Invalid Password Format", 422, next))
    } else {
        errorHandler("Incorrect Old Password", 400, next);
    }
}

const logout = (request, response, next) => {
    try {
        request.user.isLoggedIn = false;
        request.user.save();
        response.status(200).json({message: "logged out successfully"});
    } catch (error) {
        errorHandler(error.message, 400, next);
    }
}

module.exports = {
    login,
    signup,
    logout,
    forgetPassword,
    resetPassword,
    changePassword
};