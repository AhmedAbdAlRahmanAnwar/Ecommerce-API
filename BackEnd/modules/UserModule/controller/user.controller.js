const User = require('./../model/user.model');
const Product = require('./../../ProductModule/model/product.model');
const errorHandler = require('./../../../Utilities/errorHandler');
const {isMongoId} = require('validator');

const addProductToWishlist = async (request, response, next) => {
    const productId = request.body.productId;
    if (!productId) {
        errorHandler("ProductId Required", 400, next);
        return;
    }
    if (!isMongoId(productId)) {
        errorHandler("Invalid Product ID ", 400, next);
        return;
    }

    const product = await Product.findById(productId);
    if (!product) {
        errorHandler("product not found", 404, next);
        return;
    }

    User.findById(request.user._id)
        .then(async user => {
            const isProductExist = user.wishlist.find(item => item.product.toString() === productId.toString());
            if (isProductExist) {
                errorHandler("product already exist in wishlist", 400, next);
                return;
            }
            user.wishlist.push({product: productId});
            await user.save();
            response.status(200).json({message: "Product added to wishlist"})
        })
        .catch(error => errorHandler(error.message, 400, next))
}

const deleteProductFromWishlist = (request, response, next) => {
    const productId = request.body.productId;
    if (!productId) {
        errorHandler("ProductId Required", 400, next);
        return;
    }
    if (!isMongoId(productId)) {
        errorHandler("Invalid Product ID ", 400, next);
        return;
    }
    User.findById(request.user._id)
        .then(async user => {
            user.wishlist = user.wishlist.filter(item => item.product.toString() !== productId.toString());
            await user.save();
            response.status(200).json({message: "Product removed from wishlist"});
        })
        .catch(error => errorHandler(error.message, 400, next))
}

const clearWishlist = (request, response, next) => {
    User.findByIdAndUpdate(request.user._id,{wishlist:[]})
        .then(()=>response.status(200).json({message: "Wishlist is Cleared"}))
        .catch(error => errorHandler(error.message, 400, next))
}

module.exports = {
    addProductToWishlist,
    deleteProductFromWishlist,
    clearWishlist,
};