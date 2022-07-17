module.exports = (error, request, response, next) => {
    const statusCode = error.status || 500;
    response.status(statusCode).json({message: error.message})
}