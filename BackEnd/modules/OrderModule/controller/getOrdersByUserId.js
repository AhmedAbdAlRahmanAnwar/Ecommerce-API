const Order = require('./../model/order.model');
const errorHandler = require('./../../../Utilities/errorHandler');
const addPagination = require("../../../Utilities/addPagination");

module.exports = async (request, response, next) => {
    const {pageNumber, pageSize} = await addPagination(Order, request.query.page)
    Order.find({user: request.params.id}).populate({path: "user", select: "firstName lastName"})
        .skip(pageSize * (pageNumber - 1)).limit(pageSize)
        .then(orders => {
            const numberOfPages = Math.ceil(orders["length"] / pageSize) || 1;
            response.status(200).json({
                pageNumber,
                numberOfPages,
                orders
            })
        })
        .catch(() => errorHandler("Invalid User Id", 422, next))
}