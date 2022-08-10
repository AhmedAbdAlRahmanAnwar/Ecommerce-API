const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const validateAddress = require('./../../../Validators/addressValidator');
const {addProductToWishlist, deleteProductFromWishlist, clearWishlist}
    = require('./../controller/user.wishlist.controller');
const {addNewAddress, updateAddress, deleteAddress} = require('./../controller/user.address.controller');


router.route("/user")
    .get()
    .post()
    .patch()

router.route("/user/:id")
    .get()
    .delete()

router.patch("/user/addAdmin/:id")

router.route("/user/address")
    .post(authUser, validateAddress, validationMW, addNewAddress)
    .put(authUser, updateAddress)

router.delete("/user/address/:id", authUser, deleteAddress)

router.route("/user/wishlist")
    .put(authUser, addProductToWishlist)
    .delete(authUser, deleteProductFromWishlist)

router.delete("/user/wishlist/clear", authUser, clearWishlist)

module.exports = router;