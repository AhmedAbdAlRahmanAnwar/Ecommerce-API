const Order = require('./../model/order.model');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (request, response) => {
    const orders = await Order.find({user: request.user["_id"]});
    if (orders) response.status(200).json({orders});
})