const Order = require('./../model/order.model');
const Product = require('./../../ProductModule/model/product.model');
const axios = require('axios').default;
const errorHandler = require('./../../../Utilities/errorHandler');


module.exports = async (request, response, next) => {
    const {products, shippingAddress, paymentMethod} = request.body.payload;

    //Check if the required product quantity exists in stock
    try {
        let order;
        const orderObject = {
            user: request.user["_id"],
            products,
            totalPrice: request.totalPrice,
            shippingAddress,
            paymentMethod,
        };

        if (paymentMethod === "cash") {
            order = await Order.create(orderObject);
            //Update Stock
            if (order) {
                for (const {quantity, productId} of products) {
                    const product = await Product.findById(productId);
                    if (product) {
                        product.quantity -= quantity;
                        product.numberOfSales += quantity;
                        await product.save();
                    }
                }
                response.status(201).json({message: "order created", order});
            }
        } else if (paymentMethod === "card") {
            order = await Order.create(orderObject);

            if (order) {
                //Call Stripe Gateway to get ClientSecret
                axios.post(`${request.protocol}://${request.get('host')}/create-payment-intent`,
                    {totalPrice: request.totalPrice},
                    {headers: {"authorization": `Bearer ${request.token}`}})
                    .then(res => response.status(201).json({
                        message: "order created",
                        clientSecret: res.data.clientSecret,
                        order
                    }))
                    .catch(error => errorHandler(error.message, 502, next))
            }
        }
    } catch (error) {
        errorHandler(error.message, 400, next);
    }
}