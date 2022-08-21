const createOrder = require('./createOrder');
const checkout = require('./checkout');
const getAllOrders = require('./getAllOrders');
const getOrderById = require('./getOrderById');
const getMyOrders = require('./getMyOrders');
const cancelOrder = require('./cancelOrder');
const updateStock = require('./updateStock');
const updateOrderStatus = require('./updateOrderStatus');
const filterOrders = require('./filterOrders');

module.exports = {
    checkout,
    createOrder,
    getAllOrders,
    getOrderById,
    getMyOrders,
    cancelOrder,
    updateStock,
    updateOrderStatus,
    filterOrders
}