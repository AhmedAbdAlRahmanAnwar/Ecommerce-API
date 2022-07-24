const JWT = require('jsonwebtoken');

const generateAuthToken = function ({_id, isAdmin}, expire) {
    return JWT.sign({id: _id, isAdmin},
        process.env.JWT_Secret,
        {expiresIn: expire});
}

module.exports = generateAuthToken