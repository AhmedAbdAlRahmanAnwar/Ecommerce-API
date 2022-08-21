const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const {orderFilterQueryValidator} = require('../../../Validators/filterQueryValidator')
const orderValidator = require('./../../../Validators/orderValidator');

const {
    checkout,
    createOrder,
    getAllOrders,
    getOrderById,
    getMyOrders,
    cancelOrder,
    updateStock,
    updateOrderStatus,
    filterOrders
} = require('./../controller/index');

router.route("/order")
    .get(authUser, isAdmin, getAllOrders)
    .post(authUser, orderValidator, createOrder)
    .patch(authUser, isAdmin, updateOrderStatus)

router.get("/order/me", authUser, getMyOrders);
router.get("/order/success/:id", authUser, updateStock);
router.get("/order/filter", authUser, isAdmin, orderFilterQueryValidator, validationMW, filterOrders);

router.route("/order/:id")
    .get(authUser, isAdmin, getOrderById)
    .patch(authUser, cancelOrder)

router.post("/create-payment-intent", authUser, checkout);

module.exports = router;