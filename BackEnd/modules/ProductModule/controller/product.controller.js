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
        .catch(() => errorHandler("Not Valid Product ID", 422, next))
}

const createProduct = (request, response, next) => {
    if (request.file) {
        const {name, price, description, modelYear, category, quantity, rating} = request.body;
        const image = `/${request.file.key}`
        Product.create({name, price, description, modelYear, category, quantity, rating, image})
            .then(product => response.status(201).json({product}))
            .catch(error => errorHandler(error, 422, next))
    } else {
        errorHandler("Invalid Image format , Invalid Data", 400, next)
    }
}

const updateProductDetails = (request, response, next) => {
    if ("image" in request.body.payload || "rating" in request.body.payload) {
        errorHandler("not allowed updates", 400, next)
    } else {
        Product.findByIdAndUpdate(request.body.productId, request.body.payload, {runValidators: true})
            .then(product => {
                product ? response.status(200).json({message: "product details updated"})
                    : errorHandler("Product not found", 404, next)
            })
            .catch(() => errorHandler("Invalid Product Id", 422, next))
    }
}

const updateProductImage = (request, response, next) => {
    if (request.file) {
        const image = {image: `/${request.file.key}`};
        Product.findByIdAndUpdate(request.body.productId, image)
            .then(() => response.status(200).json({message: "product image updated"}))
            .catch(() => errorHandler("Invalid Product Id", 422, next))
    } else {
        errorHandler("Product Image is required", 400, next);
    }
}

const deleteProduct = (request, response, next) => {
    Product.findByIdAndDelete(request.body.productId)
        .then(product => {
            product ? response.status(200).json({message: "product deleted"})
                : errorHandler("Product Not Found", 404, next);
        })
        .catch(() => errorHandler("Invalid Product Id", 422, next))
}

const getProductsByCategory = async (request, response, next) => {
    // const category = request.query.categoryName;
    // const products = await Product.aggregate([
    //
    //     {
    //         $lookup: {
    //             from: 'categories',
    //             localField: 'category',
    //             foreignField: '_id',
    //             as: 'category'
    //         }
    //     }
    //     ,
    // {
    //     $unwind: '$category'
    // }

    // {
    //     $match:{"category.categoryName" : request.query.categoryName}
    // },
    // ])
    // response.json({products})
    // .then()
    //     .catch()
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductDetails,
    updateProductImage,
    deleteProduct,
    getProductsByCategory
}