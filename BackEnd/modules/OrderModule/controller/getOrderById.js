const Order = require('./../model/order.model');
const errorHandler = require('./../../../Utilities/errorHandler');

module.exports = (request, response, next) => {
    Order.findById(request.params.id).populate({path:"user", select:"firstName lastName"})
        .then(order => {
            order ? response.status(200).json({order}) : errorHandler("Order Not Found", 404, next)
        })
        .catch(() => errorHandler("Not Valid Order Id", 422, next))
}