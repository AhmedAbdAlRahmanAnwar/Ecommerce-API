const jwt = require('jsonwebtoken');
const User = require('./../modules/UserModule/model/user.model');
const errorHandler = require('./../Utilities/errorHandler');

const authResetAction = (request, response, next) => {
    try {
        const token = request.header('authorization').split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_Secret);
        User.findById(decodedToken.id).select("-password")
            .then(user => {
                if (user) {
                    if (user.email === request.body.payload.email) {
                        request.user = user;
                        request.token = token;
                        next();
                    } else {
                        errorHandler("invalid email", 400, next)
                    }
                } else {
                    errorHandler("User Not Found", 404, next)
                }
            }).catch(error => errorHandler(error, 422, next))
    } catch (error) {
        errorHandler("Not Authenticated", 401, next)
    }
}

const authUser = async (request, response, next) => {
    try {
        const token = request.header('authorization').split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_Secret);
        User.findById(decodedToken.id)
            .then(user => {
                if (user) {
                    if (user.isLoggedIn) {
                        request.user = user;
                        next();
                    } else {
                        errorHandler("Not Authorized", 403, next)
                    }
                } else {
                    errorHandler("User Not Found", 404, next)
                }
            })
    } catch (error) {
        errorHandler("Not Authenticated", 401, next)
    }
}

const isAdmin = (request, response, next) => {
    request.user.isAdmin ? next() : errorHandler("Not Authorized", 403, next);
}

module.exports = {authResetAction, authUser, isAdmin}