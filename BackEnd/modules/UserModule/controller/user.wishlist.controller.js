const errorHandler = require("../../../Utilities/errorHandler");
const {isMongoId} = require("validator");
const Product = require("../../ProductModule/model/product.model");

const addProductToWishlist = async (request, response, next) => {
    const productId = request.body.productId;
    const user = request.user;

    if (!productId) {
        errorHandler("ProductId Required", 400, next);
        return;
    }
    if (!isMongoId(productId)) {
        errorHandler("Invalid Product ID", 400, next);
        return;
    }

    const product = await Product.findById(productId);
    if (!product) {
        errorHandler("product not found", 404, next);
        return;
    }

    const isProductExist = user.wishlist.find(item => item.product.toString() === productId.toString());
    if (isProductExist) {
        errorHandler("product already exist in wishlist", 400, next);
        return;
    }
    user.wishlist.push({product: productId});
    await user.save();
    response.status(200).json({message: "Product added to wishlist", wishlist: user.wishlist});
}

const deleteProductFromWishlist = async (request, response, next) => {
    const productId = request.body.productId;
    const user = request.user;

    if (!productId) {
        errorHandler("ProductId Required", 400, next);
        return;
    }
    if (!isMongoId(productId)) {
        errorHandler("Invalid Product ID ", 400, next);
        return;
    }

    user.wishlist = user.wishlist.filter(item => item.product.toString() !== productId.toString());
    await user.save();
    response.status(200).json({message: "Product removed from wishlist", wishlist: user.wishlist});
}

const clearWishlist = async (request, response) => {
    const user = request.user;
    user.wishlist = [];
    await user.save();
    response.status(200).json({message: "Wishlist is Cleared"});
}

module.exports = {
    addProductToWishlist,
    deleteProductFromWishlist,
    clearWishlist,
};