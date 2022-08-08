const createOrder = require('./createOrder');
const checkout = require('./checkout');
const getAllOrders = require('./getAllOrders');
const getOrderById = require('./getOrderById');
const getOrdersByUserId = require('./getOrdersByUserId');
const getMyOrders = require('./getMyOrders');
const cancelOrder = require('./cancelOrder');
const updateStock = require('./updateStock');
const updateOrderStatus = require('./updateOrderStatus');

module.exports = {
    checkout,
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    getMyOrders,
    cancelOrder,
    updateStock,
    updateOrderStatus
}