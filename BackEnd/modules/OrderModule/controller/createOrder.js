const Order = require('./../model/order.model');
const Product = require('./../../ProductModule/model/product.model');
const axios = require('axios').default;
const errorHandler = require('./../../../Utilities/errorHandler');


module.exports = async (request, response, next) => {
    const {products, shippingAddress, paymentMethod} = request.body.payload;
    const {street, city, country, phone, postalCode} = shippingAddress;

    //Check if user entered required data
    if (!paymentMethod || !street
        || !city || !country || !postalCode || !phone) {
        errorHandler("Fields Required", 400, next);
        return;
    }

    if (!products || products.length === 0) {
        errorHandler("No products found to make an order", 404, next);
        return;
    }

    //Check if the required product quantity exists in stock
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
            return;
        }

        let order;
        const orderObject = {
            user: request.user["_id"],
            products,
            totalPrice,    //cart.totalPrice
            shippingAddress,
            paymentMethod,
        };

        if (paymentMethod === "cash") {
            order = await Order.create(orderObject);
        } else if (paymentMethod === "card") {
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' +
                today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            order = await Order.create({
                ...orderObject,
                isPaid: true,
                paidAt: date
            });
        }

        //Update product NumberOfSales and quantity fields
        if (order) {
            for (const productItem of products) {
                const {quantity, productId} = productItem;
                const product = await Product.findById(productId);
                product.quantity -= quantity;
                product.numberOfSales += quantity;
                await product.save();
            }

            /*
            //Delete Products from Cart
            const user = await User.findById(request.user._id);
            user.cart = [];
            await user.save();
            */

            axios.post(process.env.BACKEND_SERVER + '/order/create-payment-intent', {totalPrice},
                {
                    headers: {
                        "authorization": `Bearer ${request.token}`
                    }
                })
                .then(res => response.status(201).json({message: "order created", clientSecret: res.data.clientSecret}))
                .catch(error => errorHandler(error, 502, next))
        }

    } catch (error) {
        errorHandler(error.message, 400, next);
    }
}