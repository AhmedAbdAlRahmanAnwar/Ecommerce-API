const express = require('express');
const router = express.Router();
const {authUser} = require('./../../../MiddleWares/authMiddleWare');
const addReview = require('./../controller/review.controller');
const validateReview = require('./../../../Validators/reviewValidator');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');

router.post("/review", authUser, validateReview, validationMW, addReview)

module.exports = router;