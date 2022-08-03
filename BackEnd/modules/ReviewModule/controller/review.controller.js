const Product = require('./../../ProductModule/model/product.model');
const errorHandler = require('./../../../Utilities/errorHandler');

const addReview = (request, response, next) => {
    const {productId, comment, rating} = request.body.payload;
    Product.findById(productId)
        .populate({path: "category", select: "categoryName -_id"})
        .then(product => {
            if (product) {
                //Check if user already has a review
                const userIndex = product.reviews
                    .findIndex(({user}) => request.user["_id"].toString() === user.toString())
                if (userIndex === -1) {
                    product.reviews.push({user: request.user["_id"], rating, comment});
                    product.rating = ((((product.reviews.length - 1) * parseFloat(product.rating)) + parseFloat(rating)) / product.reviews.length).toFixed(1);
                    product.save()
                        .then(data => {
                            data.populate({path: "reviews.user", select: "firstName lastName -_id"})
                                .then(() => response.status(201).json({product}))
                        })
                        .catch(error => errorHandler(error, 400, next))
                } else {
                    errorHandler("Only One Review Allowed per product", 400, next);
                }
            } else {
                errorHandler("Product Not Found", 404, next)
            }
        })
        .catch(() => errorHandler("Invalid product ID", 400, next))
}

module.exports = addReview;