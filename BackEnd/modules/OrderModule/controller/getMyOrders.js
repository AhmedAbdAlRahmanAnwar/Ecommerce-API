const Order = require('./../model/order.model');
const asyncHandler = require('express-async-handler');
const addPagination = require("../../../Utilities/addPagination");

module.exports = asyncHandler(async (request, response) => {
    const {pageNumber, pageSize} = await addPagination(Order, request.query.page)

    const orders = await Order.aggregate([
        {
            $match: {user: request.user["_id"]}
        },
        {
            $facet: {
                totalCount: [
                    {$count: 'count'}
                ],
                result: [
                    {$skip: pageSize * (pageNumber - 1)}, {$limit: pageSize}
                ]
            }
        }
    ])

    const numberOfPages = Math.ceil((orders[0].totalCount[0]?.count || 0) / pageSize) || 1;
    response.status(200).json({
        pageNumber,
        numberOfPages,
        orders: orders[0].result
    });

})