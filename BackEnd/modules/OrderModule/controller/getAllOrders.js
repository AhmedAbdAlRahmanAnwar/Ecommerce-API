const Order = require('./../model/order.model');
const errorHandler = require('./../../../Utilities/errorHandler');

module.exports = (request, response, next)=>{
    Order.find().populate({path: "user", select: "firstName lastName"})
        .then(orders => response.status(200).json({orders}))
        .catch(error => errorHandler(error, 400, next))
}