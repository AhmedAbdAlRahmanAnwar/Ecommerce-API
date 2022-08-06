const Order = require('./../model/order.model');
const asyncHandler = require('express-async-handler');
const addPagination = require("../../../Utilities/addPagination");

module.exports = asyncHandler(async (request, response) => {
    const {pageNumber, pageSize, numberOfPages} = await addPagination(Order, request.query.page)
    const orders = await Order.find({user: request.user["_id"]})
        .limit(pageSize).skip(pageSize * (pageNumber - 1));
    if (orders) response.status(200).json({
        pageNumber,
        numberOfPages,
        orders
    });
})