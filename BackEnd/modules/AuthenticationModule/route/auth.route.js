const express = require('express');
const authController = require('./../controller/auth.controller');
const validateLoginData = require('./../../../Validators/loginValidator');
const validateSignupData = require('./../../../Validators/signupValidator');
const validateEmail = require('./../../../Validators/emailValidator')
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const {authenticateUser} = require('./../../../MiddleWares/authenticationMiddleWare')
const router = express.Router();

router.post("/login", validateLoginData, validationMW, authController.login);
router.post("/signup", validateSignupData, validationMW, authController.signup);
router.post("/forgetPassword", validateEmail, validationMW, authController.forgetPassword);
router.post("/resetPassword", validateLoginData, validationMW, authenticateUser, authController.resetPassword);

module.exports = router;