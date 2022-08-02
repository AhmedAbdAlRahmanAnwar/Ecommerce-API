const Product = require('./../model/product.model');
const asyncHandler = require('express-async-handler');
const errorHandler = require('./../../../Utilities/errorHandler');

const getAllProducts = asyncHandler(async (request, response) => {
    const {page = 1} = request.query;
    const pageNumber = Math.max(parseInt(page), 1);
    const pageSize = 12;
    const products = await Product.find()
        .populate({path: "category", select: "categoryName _id"})
        .limit(pageSize).skip(pageSize * (pageNumber - 1));
    const productCount = await Product.countDocuments();
    const numberOfPages = Math.ceil(productCount / pageSize);
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
        errorHandler("Invalid Image format , Invalid Data", 422, next)
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
        errorHandler("Invalid Update Error", 400, next);
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
    const pageNumber = Math.max(parseInt(page), 1);
    const pageSize = 12;

    if (searchKey) match["name"] = {$regex: searchKey, $options: "i"};
    if (categoryId) match["category"] = typeof categoryId === 'string' ? categoryId : {$in: categoryId};
    if (rating) match["rating"] = {$gte: parseInt(rating)};

    if (priceMin && priceMax) {
        match["price"] = {$gte: parseInt(priceMin), $lte: parseInt(priceMax)};
    } else if (priceMin) {
        match["price"] = {$gte: parseInt(priceMin)};
    } else if (priceMax) {
        match["price"] = {$lte: parseInt(priceMax)};
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

    Product.aggregate([{$match: match}, {$sort: sort},
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
    ])
        .then(data => {
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