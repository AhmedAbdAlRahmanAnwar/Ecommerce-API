const logger = require('./../Utilities/logger');

module.exports = (error, request, response, next) => {
    const statusCode = error.status || 500;
    logger.error(error);
    response.status(statusCode).json({message: error.message})
}