const path = require("path");
const uuid = require("uuid").v4;
const multer = require("multer");
const multerS3 = require("multer-s3");
const {S3Client, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const {isNumeric, isMongoId, isFloat} = require('validator');
const Category = require('./../modules/CategoryModule/model/category.model');
const Product = require('./../modules/ProductModule/model/product.model');
const asyncHandler = require('express-async-handler');


const s3 = new S3Client({
    region: "eu-west-3",
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
});

const isCategoryExist = (categoryId) => {
    return Category.findById(categoryId);
}

const productValidator = async (req, file, cb) => {
    const {name, price, description, category, modelYear, quantity, rating} = req.body;

    if ((!name || isNumeric(name)) ||
        (!description || isNumeric(description)) ||
        (!price || !isNumeric(price) || price < 0) ||
        (!quantity || !isNumeric(quantity) || quantity < 0) ||
        (modelYear ? (!isNumeric(modelYear) || modelYear < 0) : false) ||
        (!category || !isMongoId(category) || !await isCategoryExist(category)) ||
        (!rating || !isFloat(rating, {min: 0, max: 5}))
    ) {
        cb(null, false);
    } else {
        cb(null, true);
    }
}

const deleteOldImage = (product, cb) => {
    const bucketParams = {Bucket: "bazaarshop", Key: product.image.substring(1)};
    s3.send(new DeleteObjectCommand(bucketParams))
        .then(() => cb(null, true))
        .catch(() => cb(null, false))
}

const isProductExists = (productId, cb) => {
    Product.findById(productId)
        .then(product => {
            if (product) {
                deleteOldImage(product, cb);
            } else {
                cb(null, false);
                // errorHandler("Product not found", 404, cb);
            }
        })
        .catch(() => cb(null, false))
        // .catch(() => errorHandler("invalid product ID", 422, cb))
}

const fileFilter = asyncHandler(async (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {

        !("productId" in req.body) ? await productValidator(req, file, cb)
            : isProductExists(req.body.productId, cb)
    } else {
        cb(null, false);
    }
})

const storage = multerS3({
    s3,
    bucket: "bazaarshop",
    metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `${uuid()}${extension}`);
    },
})

const maxSize = 10 * 1000 * 1000;
const upload = multer({storage, fileFilter, limits: {fileSize: maxSize}})

module.exports = upload;