const {validationResult} = require('express-validator');

module.exports = (request, response, next) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        const errorMessage = result["errors"].reduce((current, error) => current + error.msg + ", ", "")
        const error = new Error(errorMessage);
        error.status = 422;
        next(error);
    } else {
        next()
    }
}