const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const {checkout, createOrder} = require('./../controller/index');

router.route("/order")
    .get()
    .patch()
    .post(authUser,createOrder)

router.route("/order/:id")
    .get()
    .delete()

router.post("/order/create-payment-intent",authUser, checkout)

module.exports = router;