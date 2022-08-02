const express = require('express');
const router = express.Router();
const {authUser} = require('./../../../MiddleWares/authMiddleWare');
const addReview = require('./../controller/review.controller');

router.post("/review",authUser,addReview)

module.exports = router;