const User = require('./../model/user.model');
const generateToken = require('./../../../Utilities/generateJWTtoken');

const login = function (request, response, next) {
    const {email, password} = request.body.payload;
    User.findOne({email})
        .then(async user => {
            if (user && await (user.matchPassword(password))) {
                const token = generateToken(user);
                delete user.password;
                response.status(200).json({...user,token});
            }else{
                const error = new Error("Invalid email or password");
                error.status = 401;
                next(error);
            }
        })
        .catch(error => next(error))
}

const signup = function (request, response, next) {

}

module.exports = {
    login,
    signup,
};