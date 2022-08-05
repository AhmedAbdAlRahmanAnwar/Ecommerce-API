const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const {checkout, createOrder, success} = require('./../controller/index');

router.route("/order")
    .get()
    .patch()
    .post(authUser,createOrder)

router.route("/order/:id")
    .get()
    .delete()

router.post("/order/checkout", authUser, checkout)
router.post("/order/checkout/success", success)

module.exports = router;