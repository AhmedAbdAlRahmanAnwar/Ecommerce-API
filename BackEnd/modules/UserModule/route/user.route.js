const express = require('express');
const userController = require('./../controller/user.controller');
const validateLoginData = require('../../../Validators/loginValidator');
const validateSignupData = require('../../../Validators/signupValidator');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const router = express.Router();

router.post("/login", validateLoginData, validationMW, userController.login)
router.post("/signup", validateSignupData, validationMW, userController.signup)

router.route("/user")
    .get()
    .post()
    .patch()
    .delete()

router.get("/user/:id")
router.get("/user/order/:id")

router.put("/user/changePassword")
router.put("/user/forgetPassword")

router.route("/user/address")
    .post()
    .put()

router.route("/user/wishlist")
    .put()
    .delete()

router.delete("/user/wishlist/clear")

module.exports = router;