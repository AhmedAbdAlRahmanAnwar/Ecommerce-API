const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const orderValidator = require('./../../../Validators/orderValidator');
const {checkout, createOrder, getAllOrders, getOrderById, getOrdersByUserId, getMyOrders} = require('./../controller/index');

router.route("/order")
    .get(authUser, isAdmin, getAllOrders)
    .patch()
    .post(authUser, orderValidator, createOrder)

router.get("/order/me", authUser, getMyOrders)
router.get("/order/user/:id", authUser, isAdmin, getOrdersByUserId)

router.route("/order/:id")
    .get(authUser, isAdmin, getOrderById)
    .delete()


router.post("/order/create-payment-intent", authUser, checkout)

module.exports = router;