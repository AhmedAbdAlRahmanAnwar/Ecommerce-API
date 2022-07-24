const express = require('express');
const router = express.Router();
const validateLoginData = require('./../../../Validators/loginValidator');
const validateSignupData = require('./../../../Validators/signupValidator');
const validateEmail = require('./../../../Validators/emailValidator');
const validateNewPassword = require('./../../../Validators/passwordValidator');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const {login, signup, forgetPassword, resetPassword, changePassword} = require('./../controller/auth.controller');
const {authResetAction, authUser} = require('../../../MiddleWares/authMiddleWare')

router.post("/login", validateLoginData, validationMW, login);
router.post("/signup", validateSignupData, validationMW, signup);
router.post("/forgetPassword", validateEmail, validationMW, forgetPassword);
router.post("/resetPassword", validateLoginData, validationMW, authResetAction, resetPassword);
router.patch("/changePassword", validateNewPassword, validationMW, authUser, changePassword);

module.exports = router;