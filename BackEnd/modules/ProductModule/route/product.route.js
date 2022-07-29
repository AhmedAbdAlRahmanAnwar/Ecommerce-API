const express = require('express');
const router = express.Router();
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('./../controller/product.controller');
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const upload = require('./../../../MiddleWares/uploadMiddleWare');

router.route("/product")
    .get(getAllProducts)
    .post(authUser, isAdmin, upload.single('image'), createProduct)
    .put(authUser, isAdmin, updateProduct)
    .delete(authUser, isAdmin, deleteProduct)

router.get("/product/:id", getProductById)

router.route("/product/review")
    .post()
    .delete()

router.get("/product/category/:categoryName")

module.exports = router;