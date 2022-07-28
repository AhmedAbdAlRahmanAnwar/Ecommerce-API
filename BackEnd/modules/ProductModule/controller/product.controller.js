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

const getProductById = (request, response, next) => {
    Product.findById(request.params.id)
        .then(product => {
            if (product) {
                response.status(200).json({product});
            } else {
                const error = new Error("Product not Found");
                error.status = 404;
                next(error);
            }
        })
        .catch(error => {
            error.message = "Not Valid Product ID";
            error.status = 400;
            next(error);
        })
}

const createProduct = (request, response, next) => {
    if (request.file) {
        const {name, price, description, modelYear, category, quantity, rating} = request.body;
        const image = `/${request.file.key}`
        Product.create({name, price, description, modelYear, category, quantity, rating, image})
            .then(() => response.status(201).json({message: "product added"}))
            .catch(error => {
                error.status = 422;
                next(error);
            })
    } else {
        const error = new Error("Product Image is required");
        error.status = 400;
        next(error);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
}