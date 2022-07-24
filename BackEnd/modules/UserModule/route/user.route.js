const express = require('express');
const userController = require('./../controller/user.controller');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const router = express.Router();


router.route("/user")
    .get()
    .post()
    .patch()
    .delete()

router.get("/user/:id")
router.get("/user/order/:id")

router.route("/user/address")
    .post()
    .put()

router.route("/user/wishlist")
    .put()
    .delete()

router.delete("/user/wishlist/clear")

module.exports = router;