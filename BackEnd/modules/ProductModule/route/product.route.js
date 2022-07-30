const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const upload = require('./../../../MiddleWares/uploadMiddleWare');
const productValidator = require('./../../../Validators/productDetailsValidator');
const validationMW = require('./../../../MiddleWares/validationMiddleWare')
const {getAllProducts, getProductById, createProduct, updateProductDetails, updateProductImage, deleteProduct}
    = require('./../controller/product.controller');

router.route("/product")
    .get(getAllProducts)
    .post(authUser, isAdmin, upload.single('image'), createProduct)
    .put(authUser, isAdmin, productValidator, validationMW, updateProductDetails)
    .delete(authUser, isAdmin, deleteProduct)

router.get("/product/:id", getProductById)
router.patch("/product/image", authUser, isAdmin, upload.single('image'), updateProductImage)

router.route("/product/review")
    .post()
    .delete()

router.get("/product/category/:categoryName")

module.exports = router;