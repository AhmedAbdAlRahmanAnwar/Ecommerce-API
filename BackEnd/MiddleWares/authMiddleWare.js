const jwt = require('jsonwebtoken');
const User = require('./../modules/UserModule/model/user.model');
const errorHandler = require('./../Utilities/errorHandler');

const authResetAction = (request, response, next) => {
    try {
        const token = request.header('authorization').split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_Secret);
        User.findById(decodedToken.id).select("-password -resetPasswordToken")
            .then(user => {
                if (!user) {
                    errorHandler("User Not Found", 404, next);
                    return;
                }
                if (user.email !== request.body.payload.email) {
                    errorHandler("invalid email", 400, next);
                    return;
                }
                request.user = user;
                request.token = token;
                next();
            })
    } catch (error) {
        errorHandler("Not Authenticated", 401, next)
    }
}

const authUser = async (request, response, next) => {
    try {
        const token = request.header('authorization').split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_Secret);
        User.findById(decodedToken.id).select("-password -resetPasswordToken")
            .then(user => {
                if (!user) {
                    errorHandler("User Not Found", 404, next);
                    return;
                }
                if (!user.isLoggedIn) {
                    errorHandler("Not Authorized", 403, next);
                    return;
                }
                request.user = user;
                request.token = token;
                next();
            })
    } catch (error) {
        errorHandler("Not Authenticated", 401, next);
    }
}

const isAdmin = (request, response, next) => {
    request.user.isAdmin ? next() : errorHandler("Not Authorized", 403, next);
}

module.exports = {authResetAction, authUser, isAdmin}