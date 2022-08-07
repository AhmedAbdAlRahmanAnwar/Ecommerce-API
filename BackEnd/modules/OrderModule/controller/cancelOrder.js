const Order = require('./../model/order.model');
const Product = require('./../../ProductModule/model/product.model');
const errorHandler = require('./../../../Utilities/errorHandler');

module.exports = (request, response, next) => {
    Order.findById(request.params.id)
        .then(async order => {
            if (!order) {
                errorHandler("Order Not Found", 404, next);
                return;
            }
            if (order.user.value !== request.user["_id"].value || order.status !== "pending") {
                errorHandler("Not Authorized", 403, next);
                return;
            }
            for (const {productId, quantity} of order.products) {
                const product = await Product.findById(productId);
                if (product) {
                    product.quantity +=  quantity;
                    product.numberOfSales -= quantity;
                    await product.save();
                }
            }
            order.status = "cancelled";
            await order.save();
            response.status(200).json({message: "Order is Cancelled", order});
        })
        .catch(() => errorHandler("Invalid Order ID", 400, next))
}