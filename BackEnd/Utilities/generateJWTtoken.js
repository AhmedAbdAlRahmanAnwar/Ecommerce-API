const JWT = require('jsonwebtoken');

module.exports = function ({_id, isAdmin}) {
    return JWT.sign({id: _id, isAdmin},
        process.env.JWT_Secret,
        {expiresIn: "2d"});
}