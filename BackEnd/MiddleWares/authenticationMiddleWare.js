const jwt = require('jsonwebtoken');
const User = require('./../modules/UserModule/model/user.model');

const authenticateUser = (request,response,next) => {
    try{
        const token = request.header('authorization').split(" ")[1];
        const decodedToken = jwt.verify(token,process.env.JWT_Secret);
        User.findById(decodedToken.id)
            .then(user=>{
                if (user){
                    if (user.email === request.body.payload.email){
                        request.user = user;
                        request.token = token;
                        next();
                    }else{
                        const error = new Error("invalid email");
                        error.status = 400;
                        next(error);
                    }
                }else{
                    const error = new Error("User Not Found");
                    error.status = 404;
                    next(error);
                }
            }).catch(error => next(error))
    }catch (error) {
        error.message = "Not Authorized";
        error.status = 403;
        next(error);
    }
}

module.exports = {authenticateUser}