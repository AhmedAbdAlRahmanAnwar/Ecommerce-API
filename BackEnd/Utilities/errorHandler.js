module.exports = (errorMessage, statusCode, next) => {
    const error = new Error(errorMessage);
    error.status = statusCode;
    next(error);
}