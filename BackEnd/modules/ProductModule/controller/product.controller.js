const Product = require('./../model/product.model');
const asyncHandler = require('express-async-handler');
const errorHandler = require('./../../../Utilities/errorHandler');

const getAllProducts = asyncHandler(async (request, response) => {
    const page = Math.max(parseInt(request.query.page), 1);
    const pageSize = 10;
    const products = await Product.find()
        .populate({path: "category", select: "categoryName -_id"})
        .limit(pageSize).skip(pageSize * (page - 1));
    const productCount = await Product.countDocuments();
    const numberOfPages = Math.ceil(productCount / pageSize);
    if (products) {
        response.status(200).json({
            page,
            numberOfPages,
            products
        });
    }
})

const getProductById = (request, response, next) => {
    Product.findById(request.params.id)
        .then(product => product ? response.status(200).json({product})
            : errorHandler("Product not Found", 404, next))
        .catch(error => errorHandler("Not Valid Product ID", 400, next))
}

const createProduct = (request, response, next) => {
    if (request.file) {
        const {name, price, description, modelYear, category, quantity, rating} = request.body;
        const image = `/${request.file.key}`
        Product.create({name, price, description, modelYear, category, quantity, rating, image})
            .then(() => response.status(201).json({message: "product added"}))
            .catch(error => errorHandler(error, 422, next))
    } else {
        errorHandler("Product Image is required", 400, next)
    }
}

const updateProduct = (request, response, next) => {

}

const deleteProduct = (request, response, next) => {
    Product.findByIdAndDelete(request.body.productId)
        .then(product => {
            product ? response.status(200).json({message: "product deleted"})
                : errorHandler("Product Not Found", 404, next);
        })
        .catch(error => errorHandler(error, 422, next))
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}