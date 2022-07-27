const express = require('express');
const router = express.Router();
const {getAllProducts, getProductById, createProduct} = require('./../controller/product.controller')

router.route(["/product","/"])
    .get(getAllProducts)
    .post()
    .put()
    .delete()

router.get("/product/:id", getProductById)

router.route("/product/review")
    .post()
    .delete()

router.get("/product/category/:categoryName")

module.exports = router;