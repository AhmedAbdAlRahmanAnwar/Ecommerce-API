const User = require('./../model/user.model');
const Order = require('./../../OrderModule/model/order.model');
const errorHandler = require('./../../../Utilities/errorHandler');
const addPagination = require("../../../Utilities/addPagination");

const getAllUsers = (request, response, next) => {
    User.find().select("firstName lastName email isAdmin createdAt")
        .then(users => response.status(200).json({users}))
        .catch(error => errorHandler(error.message, 400, next))
}

const getUserById = (request, response, next) => {
    User.findById(request.params.id).select("firstName lastName email isAdmin createdAt updatedAt")
        .then(user => {
            if (!user) {
                errorHandler("User Not Found", 404, next);
                return;
            }
            return user;
        })
        .then(async user => {
            const {pageNumber, pageSize} = await addPagination(Order, request.query.page)
            const userOrders = await Order.find({user: request.params.id})
                .select("-user").limit(pageSize).skip(pageSize * (pageNumber - 1));
            const numberOfPages = Math.ceil(userOrders["length"] / pageSize) || 1;
            response.status(200).json({user, userOrders, pageNumber, numberOfPages});
        })
        .catch(error => errorHandler(error.message, 400, next))
}

const deleteUser = async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id);
        if (!user) {
            errorHandler("User Not Found", 404, next);
            return;
        }
        if (request.params.id === request.user["_id"].toString()) {
            errorHandler("Admin can't delete himself", 400, next);
            return;
        }
        user.deleteOne()
            .then(() => response.status(200).json({message: "User Deleted Successfully"}));

    } catch (error) {
        errorHandler(error.message, 400, next)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser
};