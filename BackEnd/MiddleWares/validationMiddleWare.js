const {validationResult} = require('express-validator');
const errorHandler = require('./../Utilities/errorHandler');

module.exports = (request, response, next) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        const errorMessage = result["errors"].reduce((current, error) => current + error.msg + ", ", "");
        errorHandler(errorMessage, 422, next);
    } else {
        next();
    }
}