const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const orderValidator = require('./../../../Validators/orderValidator');
const {checkout, createOrder, getAllOrders} = require('./../controller/index');

router.route("/order")
    .get(authUser, isAdmin, getAllOrders)
    .patch()
    .post(authUser, orderValidator, createOrder)

router.route("/order/:id")
    .get()
    .delete()

router.post("/order/create-payment-intent", authUser, checkout)

module.exports = router;