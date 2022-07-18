const User = require('./../model/user.model');
const generateToken = require('./../../../Utilities/generateJWTtoken');
const sendWelcomeMail = require('./../../../Utilities/sendMail');

const login = function (request, response, next) {
    const {email, password} = request.body.payload;
    User.findOne({email})
        .then(async user => {
            if (user && await (user.matchPassword(password))) {
                const token = generateToken(user);
                response.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    address: user.address,
                    wishlist: user.wishlist,
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
                const token = generateToken(user);
                response.status(201).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    address: user.address,
                    wishlist: user.wishlist,
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

module.exports = {
    login,
    signup,
};