const express = require('express');
const router = express.Router();
const {getAllProducts,createProduct} = require('./../controller/product.controller')

router.route(["/product","/"])
    .get(getAllProducts)
    .post()
    .put()
    .delete()

router.get("/product/:id")

router.route("/product/review")
    .post()
    .delete()

router.get("/product/category/:categoryName")

module.exports = router;