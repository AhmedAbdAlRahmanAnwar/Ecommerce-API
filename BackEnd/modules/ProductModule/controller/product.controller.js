const Product = require('./../model/product.model');
const asyncHandler = require('express-async-handler');


const getAllProducts = asyncHandler(async (request, response) => {
    const page = Math.max(parseInt(request.query.page), 1);
    const pageSize = 10;
    const products = await Product.find()
        .populate({path: "category", select: "categoryName -_id"})
        .limit(pageSize).skip(pageSize * (page - 1));
    const productCount = await Product.countDocuments();
    const numberOfPages = Math.ceil(productCount / pageSize);
    response.status(200).json({
        page,
        numberOfPages,
        products
    });
})

const createProduct = (request, response, next) => {

}

module.exports = {
    getAllProducts,
    createProduct,
}