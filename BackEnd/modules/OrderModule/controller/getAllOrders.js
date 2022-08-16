const Order = require('./../model/order.model');
const errorHandler = require('./../../../Utilities/errorHandler');
const addPagination = require('./../../../Utilities/addPagination');

module.exports = async (request, response, next) => {
    const {pageNumber, pageSize, numberOfPages} = await addPagination(Order,request.query.page);
    Order.find().select("user totalPrice status paymentMethod isDelivered")
        .populate({path: "user", select: "firstName lastName"})
        .limit(pageSize).skip(pageSize * (pageNumber - 1))
        .then(orders => response.status(200).json({
            pageNumber,
            numberOfPages,
            orders
        }))
        .catch(error => errorHandler(error.message, 400, next))
}