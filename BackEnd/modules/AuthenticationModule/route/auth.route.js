const express = require('express');
const router = express.Router();
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const {authResetAction, authUser} = require('../../../MiddleWares/authMiddleWare')
const validateSignupData = require('./../../../Validators/signupValidator');
const {validateEmail, validatePassword} = require('./../../../Validators/loginValidator');
const {login, signup, logout, forgetPassword, resetPassword, changePassword}
    = require('./../controller/auth.controller');

router.post("/login", validateEmail, validationMW, login);
router.post("/signup", validateSignupData, validationMW, signup);
router.post("/logout", authUser, logout);
router.post("/forgetPassword", validateEmail, validationMW, forgetPassword);
router.post("/resetPassword", authResetAction, validateEmail, validatePassword, validationMW, resetPassword);
router.patch("/changePassword", authUser, validatePassword, validationMW, changePassword);

module.exports = router;