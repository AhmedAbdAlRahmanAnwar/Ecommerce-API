const jwt = require('jsonwebtoken');
const User = require('./../modules/UserModule/model/user.model');

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
                        const error = new Error("invalid email");
                        error.status = 400;
                        next(error);
                    }
                } else {
                    const error = new Error("User Not Found");
                    error.status = 404;
                    next(error);
                }
            }).catch(error => next(error))
    } catch (error) {
        error.message = "Not Authenticated";
        error.status = 401;
        next(error);
    }
}

const authUser = (request, response, next) => {
    try{
        const token = request.header('authorization').split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_Secret);
        if (decodedToken?.id === request.body.userId) {
            request.id = decodedToken.id;
            next();
        } else {
            const error = new Error("Not Authorized");
            error.status = 403;
            next(error);
        }
    }catch (error) {
        error.message = "Not Authenticated";
        error.status = 401;
        next(error);
    }
}

module.exports = {authResetAction, authUser}