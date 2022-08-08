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

            if (order.user.value !== request.user["_id"].value) {
                errorHandler("Not Authorized", 403, next);
                return;
            }

            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' +
                today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            order.isPaid = true;
            order.paidAt = date;
            await order.save();

            //Update product NumberOfSales and quantity fields
            for (const productItem of order.products) {
                const {quantity, productId} = productItem;
                const product = await Product.findById(productId);
                product.quantity -= quantity;
                product.numberOfSales += quantity;
                await product.save();
            }
            response.status(200).json({message: "Stock Updated Successfully"})
        })
        .catch(() => errorHandler("Invalid Order Id", 400, next))
}