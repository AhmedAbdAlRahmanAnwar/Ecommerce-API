const Product = require('./../model/product.model');
const asyncHandler = require('express-async-handler');
const errorHandler = require('./../../../Utilities/errorHandler');
const mongoose = require('mongoose');
const {DeleteObjectCommand} = require("@aws-sdk/client-s3");
const s3 = require('./../../../Config/AWS_S3Configuration');
const addPagination = require("../../../Utilities/addPagination");


const getAllProducts = asyncHandler(async (request, response) => {
    const {pageNumber, pageSize, numberOfPages} = await addPagination(Product, request.query.page)
    const products = await Product.find()
        .populate({path: "category", select: "categoryName _id"})
        .populate({path: "reviews.user", select: "firstName lastName -_id"})
        .limit(pageSize).skip(pageSize * (pageNumber - 1));

    if (products) {
        response.status(200).json({
            pageNumber,
            numberOfPages,
            products
        });
    }
})

const getProductById = (request, response, next) => {
    Product.findById(request.params.id)
        .populate({path: "category", select: "categoryName _id"})
        .populate({path: "reviews.user", select: "firstName lastName -_id"})
        .then(product => product ? response.status(200).json({product})
            : errorHandler("Product not Found", 404, next))
        .catch(() => errorHandler("Not Valid Product ID", 422, next))
}

const createProduct = (request, response, next) => {
    if (request.file) {
        const {name, price, description, modelYear, category, quantity} = request.body;
        const image = `/${request.file.key}`
        Product.create({name, price, description, modelYear, category, quantity, image})
            .then(product => response.status(201).json({product}))
            .catch(error => errorHandler(error, 422, next))
    } else {
        errorHandler("Invalid Image format , Invalid Data", 422, next)
    }
}

const updateProductDetails = (request, response, next) => {
    Product.findByIdAndUpdate(request.body.productId, request.body.payload, {runValidators: true})
        .then(product => {
            product ? response.status(200).json({message: "product details updated"})
                : errorHandler("Product not found", 404, next)
        })
        .catch(() => errorHandler("Invalid Product Id", 422, next))

}

const updateProductImage = (request, response, next) => {
    if (request.file) {
        const image = {image: `/${request.file.key}`};
        Product.findByIdAndUpdate(request.body.productId, image)
            .then(() => response.status(200).json({message: "product image updated"}))
            .catch(() => errorHandler("Invalid Product Id", 422, next))
    } else {
        errorHandler("Invalid Update Error", 400, next);
    }
}

const deleteProduct = (request, response, next) => {
    Product.findByIdAndDelete(request.body.productId)
        .then(product => {
            if (product) {
                if (product.numberOfSales) {
                    //Delete from Amazon S3
                    const bucketParams = {Bucket: "bazaarshop", Key: product.image.substring(1)};
                    s3.send(new DeleteObjectCommand(bucketParams))
                }
                response.status(200).json({message: "product deleted"})
            } else {
                errorHandler("Product Not Found", 404, next);
            }
        })
        .catch(() => errorHandler("Invalid Product Id", 422, next))
}

const getFilteredProducts = (request, response, next) => {
    const {
        searchKey,
        categoryId,
        page = 1,
        modelYearMin,
        modelYearMax,
        priceMin,
        priceMax,
        rating,
        priceSort,
        modelYearSort,
        ratingSort
    } = request.query;

    const match = {}, sort = {_id: 1};
    const pageNumber = parseInt(page) ? Math.max(parseInt(page), 1) : 1;
    const pageSize = 12;

    if (searchKey) match["name"] = {$regex: searchKey, $options: "i"};
    if (rating) match["rating"] = {$gte: parseFloat(rating)};

    if (categoryId) match["category"] = typeof categoryId === 'string' ? mongoose.Types.ObjectId(categoryId)
        : {$in: categoryId.map(category => mongoose.Types.ObjectId(category))};

    if (priceMin && priceMax) {
        match["price"] = {$gte: parseFloat(priceMin), $lte: parseFloat(priceMax)};
    } else if (priceMin) {
        match["price"] = {$gte: parseFloat(priceMin)};
    } else if (priceMax) {
        match["price"] = {$lte: parseFloat(priceMax)};
    }

    if (modelYearMin && modelYearMax) {
        match["modelYear"] = {$gte: parseInt(modelYearMin), $lte: parseInt(modelYearMax)};
    } else if (modelYearMin) {
        match["modelYear"] = {$gte: parseInt(modelYearMin)};
    } else if (modelYearMax) {
        match["modelYear"] = {$lte: parseInt(modelYearMax)};
    }

    if (priceSort) {
        delete sort["_id"];
        if (priceSort === "lth") {
            sort["price"] = 1
        } else if (priceSort === "htl") {
            sort["price"] = -1
        }
    }

    if (modelYearSort) {
        delete sort["_id"];
        if (modelYearSort === "lth") {
            sort["modelYear"] = 1
        } else if (modelYearSort === "htl") {
            sort["modelYear"] = -1
        }
    }

    if (ratingSort) {
        delete sort["_id"];
        if (ratingSort === "lth") {
            sort["rating"] = 1
        } else if (ratingSort === "htl") {
            sort["rating"] = -1
        }
    }

    Product.aggregate([
        {
            $match: match
        },
        {
            $lookup: {
                from: "categories",
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $lookup: {
                from: "users",
                localField: "reviews.user",
                foreignField: '_id',
                as: 'userData'
            }
        },
        {
            $set: {
                "reviews": {
                    $map: {
                        "input": "$reviews",
                        "in": {
                            $mergeObjects: [
                                "$$this",
                                {
                                    user: {
                                        $arrayElemAt: [
                                            "$userData",
                                            {
                                                "$indexOfArray": [
                                                    "$userData.id",
                                                    "$$this.id"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $unset: "userData"
        },
        {
            $project: {
                "category.__v": 0,
                "reviews.user._id": 0,
                "reviews.user.email": 0,
                "reviews.user.password": 0,
                "reviews.user.isAdmin": 0,
                "reviews.user.address": 0,
                "reviews.user.wishlist": 0,
                "reviews.user.isLoggedIn": 0,
                "reviews.user.__v": 0,
                "reviews.user.resetPasswordToken": 0,
                "reviews.user.createdAt": 0,
                "reviews.user.updatedAt": 0,
            }
        },
        {
            $sort: sort
        },
        {
            $facet: {
                totalCount: [
                    {$count: 'count'}
                ],
                result: [
                    {$skip: pageSize * (pageNumber - 1)}, {$limit: pageSize}
                ]
            }
        }
    ]).then(data => {
        const numberOfPages = Math.ceil((data[0].totalCount[0]?.count || 0) / pageSize);
        response.status(200).json({
            pageNumber,
            numberOfPages,
            products: data[0].result
        });
    })
        .catch(error => errorHandler(error, 400, next))
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductDetails,
    updateProductImage,
    deleteProduct,
    getFilteredProducts
}