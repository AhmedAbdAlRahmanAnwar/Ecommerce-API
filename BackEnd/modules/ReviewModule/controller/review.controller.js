const Product = require('./../../ProductModule/model/product.model');
const Order = require('./../../OrderModule/model/order.model');
const errorHandler = require('./../../../Utilities/errorHandler');


const addReview = (request, response, next) => {
    const {productId, comment, rating} = request.body.payload;
    Product.findById(productId)
        .populate({path: "category", select: "categoryName -_id"})
        .then(async product => {
            if (product) {

                const isBought = await Order.findOne({
                    user: request.user["_id"], status: 'delivered',
                    "products.productId": productId
                })
                if (!isBought) {
                    errorHandler("Product must be bought before reviewing", 403, next);
                    return;
                }

                //Check if user already has a review
                const userIndex = product.reviews
                    .findIndex(({user}) => request.user["_id"].toString() === user.toString())
                if (userIndex !== -1) {
                    errorHandler("Only One Review Allowed per product", 400, next);
                    return;
                }

                product.reviews.push({user: request.user["_id"], rating, comment});
                product.rating = ((((product.reviews.length - 1) * parseFloat(product.rating)) + parseFloat(rating)) / product.reviews.length).toFixed(1);
                product.save()
                    .then(data => {
                        data.populate({path: "reviews.user", select: "firstName lastName -_id"})
                            .then(() => response.status(201).json({product}))
                    })
                    .catch(error => errorHandler(error.message, 400, next))

            } else {
                errorHandler("Product Not Found", 404, next)
            }
        })
        .catch(() => errorHandler("Invalid product ID", 400, next))
}

module.exports = addReview;