const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const {checkout, createOrder, success, testget} = require('./../controller/index');

router.route("/order")
    .get()
    .patch()
    .post(authUser,createOrder)

router.route("/order/:id")
    .get()
    .delete()

router.post("/order/checkout", authUser, checkout)
router.post("/order/checkout/success", success)
router.get("/order/checkout/success", testget)

module.exports = router;