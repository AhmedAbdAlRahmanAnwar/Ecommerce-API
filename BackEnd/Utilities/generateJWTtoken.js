const JWT = require('jsonwebtoken');

const generateAuthToken = function (id, expire) {
    return JWT.sign({id},
        process.env.JWT_Secret,
        {expiresIn: expire});
}

module.exports = generateAuthToken