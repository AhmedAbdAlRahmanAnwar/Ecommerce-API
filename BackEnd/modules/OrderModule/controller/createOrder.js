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

            //Call Stripe Gateway to get ClientSecret
            if (paymentMethod === "card") {
                axios.post(`${request.protocol}://${request.get('host')}/create-payment-intent`,
                    {
                        totalPrice: request.totalPrice
                    },
                    {
                        headers: {
                            "authorization": `Bearer ${request.token}`
                        }
                    })
                    .then(res => response.status(201).json({
                        message: "order created",
                        orderId:order["_id"],
                        clientSecret: res.data.clientSecret
                    }))
                    .catch(error => errorHandler(error, 502, next))
            } else {
                response.status(201).json({message: "order created", orderId:order["_id"]});
            }
        }
    } catch (error) {
        errorHandler(error.message, 400, next);
    }
}