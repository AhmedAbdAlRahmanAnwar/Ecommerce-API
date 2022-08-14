const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const validateNewUserInfo = require('./../../../Validators/userInfoValidator');
const {validateNewAddressData, validateUpdatedAddressData}
    = require('./../../../Validators/addressValidator');
const {addNewAddress, updateAddress, deleteAddress}
    = require('./../controller/user.address.controller');
const {getAllUsers, getUserById, deleteUser, makeUserAdmin, updateUserInfo}
    = require('./../controller/user.controller');
const {addProductToWishlist, deleteProductFromWishlist, clearWishlist}
    = require('./../controller/user.wishlist.controller');


router.route("/user")
    .get(authUser, isAdmin, getAllUsers)
    .patch(authUser, validateNewUserInfo, validationMW, updateUserInfo)

router.patch("/user/addAdmin/:id", authUser, isAdmin, makeUserAdmin);

router.route("/user/address")
    .post(authUser, validateNewAddressData, validationMW, addNewAddress)
    .put(authUser, validateUpdatedAddressData, validationMW, updateAddress)

router.delete("/user/address/:id", authUser, deleteAddress);

router.route("/user/wishlist")
    .put(authUser, addProductToWishlist)
    .delete(authUser, deleteProductFromWishlist)

router.delete("/user/wishlist/clear", authUser, clearWishlist);

router.route("/user/:id")
    .get(authUser, isAdmin, getUserById)
    .delete(authUser, isAdmin, deleteUser)

module.exports = router;