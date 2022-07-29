const path = require("path");
const uuid = require("uuid").v4;
const multer = require("multer");
const multerS3 = require("multer-s3");
const {isNumeric, isMongoId, isFloat} = require('validator');
const {S3Client} = require("@aws-sdk/client-s3");
const Category = require('./../modules/CategoryModule/model/category.model');
const errorHandler = require('./../Utilities/errorHandler');

const s3 = new S3Client({
    region: "eu-west-3",
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
});

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

const isCategoryExist = (categoryId) => {
    return Category.findById(categoryId);
}

const productValidator = async (body, cb) => {
    const {name, price, description, category, modelYear, quantity, rating} = body;

    if ((!name || isNumeric(name)) ||
        (!description || isNumeric(description)) ||
        (!price || !isNumeric(price) || price < 0) ||
        (!quantity || !isNumeric(quantity) || quantity < 0) ||
        (modelYear ? (!isNumeric(modelYear) || modelYear < 0) : false) ||
        (!category || !isMongoId(category) || !await isCategoryExist(category)) ||
        (!rating || !isFloat(rating, {min: 0, max: 5}))
    ) {
        errorHandler("Invalid Product Data", 422, cb)
    }
}

const fileFilter = async (req, file, cb) => {
    await productValidator(req.body, cb);
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        errorHandler("only png,jpg,jpeg formats allowed", 400, cb)
    }
}

const maxSize = 10 * 1000 * 1000;
const upload = multer({storage, fileFilter, limits: {fileSize: maxSize}})

module.exports = upload;