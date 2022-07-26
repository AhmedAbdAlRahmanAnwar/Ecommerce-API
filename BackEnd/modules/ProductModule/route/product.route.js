const express = require('express');
const router = express.Router();

router.route(["/product","/"])
    .get()
    .post()
    .put()
    .delete()

router.get("/product/:id")

router.route("/product/review")
    .post()
    .delete()

router.get("/product/category/:categoryName")

module.exports = router;