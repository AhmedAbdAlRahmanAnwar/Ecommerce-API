const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const {
    addProductToWishlist,
    deleteProductFromWishlist,
    clearWishlist
} = require('./../controller/user.controller');


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
    .put(authUser,addProductToWishlist)
    .delete(authUser, deleteProductFromWishlist)

router.delete("/user/wishlist/clear", authUser, clearWishlist)

module.exports = router;