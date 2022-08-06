const Order = require('./../model/order.model');
const errorHandler = require('./../../../Utilities/errorHandler');

module.exports = (request, response, next) => {
    Order.find({user:request.params.id}).populate({path:"user", select:"firstName lastName"})
        .then(orders => response.status(200).json({orders}))
        .catch(() => errorHandler("Invalid User Id", 422, next))
}