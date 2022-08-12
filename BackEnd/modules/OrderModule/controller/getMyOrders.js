const Order = require('./../model/order.model');
const asyncHandler = require('express-async-handler');
const addPagination = require("../../../Utilities/addPagination");

module.exports = asyncHandler(async (request, response) => {
    const {pageNumber, pageSize} = await addPagination(Order, request.query.page)
    const orders = await Order.find({user: request.user["_id"]})
        .limit(pageSize).skip(pageSize * (pageNumber - 1));
    if (orders) {
        const numberOfPages = Math.ceil(orders["length"] / pageSize) || 1;
        response.status(200).json({
            pageNumber,
            numberOfPages,
            orders
        });
    }
})