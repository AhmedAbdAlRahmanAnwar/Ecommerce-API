const Order = require('./../model/order.model');
const Product = require('./../../ProductModule/model/product.model');
const errorHandler = require('./../../../Utilities/errorHandler');

module.exports = (request, response, next) => {
    Order.findById(request.params.id)
        .then(async order =>{
            if (!order) {
                errorHandler("Order Not Found", 404, next);
                return;
            }
            //Update product NumberOfSales and quantity fields
            for (const productItem of order.products) {
                const {quantity, productId} = productItem;
                const product = await Product.findById(productId);
                product.quantity -= quantity;
                product.numberOfSales += quantity;
                await product.save();
            }
            response.status(200).json({message:"Stock Updated Successfully"})
        })
        .catch(()=>errorHandler("Invalid Order Id", 400, next))
}