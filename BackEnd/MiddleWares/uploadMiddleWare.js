const path = require("path");
const uuid = require("uuid").v4;
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require('./../Config/AWS_S3Configuration');
const asyncHandler = require('express-async-handler');
const {DeleteObjectCommand} = require("@aws-sdk/client-s3");
const Product = require('./../modules/ProductModule/model/product.model');


const deleteOldImage = asyncHandler((product, cb) => {
    const bucketParams = {Bucket: "bazaarshop", Key: product.image.substring(1)};
    s3.send(new DeleteObjectCommand(bucketParams))
        .then(() => cb(null, true))
})

const checkProductAndDeleteImage = asyncHandler(async (productId, cb) => {
    const product = await Product.findById(productId);
    if (product && product?.numberOfSales) deleteOldImage(product, cb);
})

const fileFilter = asyncHandler(async (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {

        //In case of update product image, delete old image
        if ("productId" in req.body) {
            checkProductAndDeleteImage(req.body.productId, cb);
        }
        cb(null, true);
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

const maxSize = 10 * 1000 * 1000;   //10 MegaByte
const upload = multer({storage, fileFilter, limits: {fileSize: maxSize}})

module.exports = upload;