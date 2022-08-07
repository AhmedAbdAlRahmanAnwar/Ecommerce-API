const createOrder = require('./createOrder');
const checkout = require('./checkout');
const getAllOrders = require('./getAllOrders');
const getOrderById = require('./getOrderById');
const getOrdersByUserId = require('./getOrdersByUserId');
const getMyOrders = require('./getMyOrders');
const cancelOrder = require('./cancelOrder');

module.exports = {
    checkout,
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    getMyOrders,
    cancelOrder,
}