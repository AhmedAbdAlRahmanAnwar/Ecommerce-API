const errorHandler = require("../Utilities/errorHandler");
const Product = require("../modules/ProductModule/model/product.model");


module.exports = async (request, response, next) => {
    const {products, shippingAddress, paymentMethod} = request.body.payload;
    const {street, city, country, mobile} = shippingAddress;

    //Check if user entered required data
    if (!paymentMethod || !street || !city || !country || !mobile) {
        errorHandler("Fields Required", 400, next);
        return;
    }

    if (!products || products.length === 0) {
        errorHandler("No products found to make an order", 404, next);
        return;
    }

    try {
        let totalPrice = 0;
        const productsQuantityErrors = [];
        for (const productItem of products) {
            const {productId, quantity} = productItem;
            const product = await Product.findById(productId);
            if (product) {
                if (parseInt(quantity) > parseInt(product.quantity)) {
                    productsQuantityErrors.push({productId, quantity: product.quantity});
                }
                totalPrice += product.price;
            } else {
                errorHandler("Product Not Found", 404, next);
                return;
            }
        }

        if (productsQuantityErrors.length > 0) {
            response.status(400).json({quantityErrors: productsQuantityErrors});
        } else {
            request.totalPrice = totalPrice;
            next();
        }
    } catch (error) {
        errorHandler(error.message, 400, next);
    }
}