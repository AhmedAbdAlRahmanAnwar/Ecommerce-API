const Order = require('./../model/order.model');
const Product = require("../../ProductModule/model/product.model");
const errorHandler = require('./../../../Utilities/errorHandler');

module.exports = (request, response, next) => {
    const {orderId, status} = request.body.payload;
    if (!status) {
        errorHandler("Status Required", 400, next);
        return;
    }
    if (!['accepted', 'rejected', 'shipped', 'delivered', 'cancelled'].includes(status)) {
        errorHandler("Not Valid Status", 400, next);
        return;
    }
    Order.findById(orderId)
        .then(async order => {
            if (!order) {
                errorHandler("Order Not Found", 404, next);
                return;
            }
            if (order.status === "delivered" && status === "cancelled") {
                errorHandler("Can't cancel order that has been delivered", 400, next);
                return;
            }
            if (order && status === "cancelled") {
                for (const {quantity, productId} of order.products) {
                    const product = await Product.findById(productId);
                    if (product) {
                        product.quantity += quantity;
                        product.numberOfSales -= quantity;
                        await product.save();
                    }
                }
            }
            order.status = status;
            await order.save();
            response.status(200).json({message: "Order Status Updated", order})
        })
        .catch(() => errorHandler("Not Valid Order Id", 422, next))
}