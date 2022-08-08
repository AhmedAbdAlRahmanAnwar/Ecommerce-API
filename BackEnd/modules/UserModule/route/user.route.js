const express = require('express');
const userController = require('./../controller/user.controller');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const router = express.Router();


router.route("/user")
    .get()
    .post()
    .patch()

router.route("/user/:id")
    .get()
    .delete()

router.patch("/user/addAdmin/:id")

router.route("/user/address")
    .post()
    .put()

router.route("/user/wishlist")
    .put()
    .delete()

router.delete("/user/wishlist/clear")

module.exports = router;