const User = require('./../model/user.model');
const Order = require('./../../OrderModule/model/order.model');
const errorHandler = require('./../../../Utilities/errorHandler');
const addPagination = require("../../../Utilities/addPagination");
const mongoose = require("mongoose");

const getAllUsers = async (request, response, next) => {
    const {pageNumber, pageSize, numberOfPages} = await addPagination(User, request.query.page)
    User.find().select("firstName lastName email isAdmin createdAt")
        .skip(pageSize * (pageNumber - 1)).limit(pageSize)
        .then(users => response.status(200).json({pageNumber, numberOfPages, users}))
        .catch(error => errorHandler(error.message, 400, next))
}

const getUserById = (request, response, next) => {
    User.findById(request.params.id).select("firstName lastName email isAdmin createdAt")
        .then(user => {
            if (!user) {
                errorHandler("User Not Found", 404, next);
                return;
            }
            return user;
        })
        .then(async user => {
            const {pageNumber, pageSize} = await addPagination(Order, request.query.page)

            const userOrders = await Order.aggregate([
                {
                    $match: {user: mongoose.Types.ObjectId(request.params.id)}
                },
                {
                    $facet: {
                        totalCount: [
                            {$count: 'count'}
                        ],
                        result: [
                            {$skip: pageSize * (pageNumber - 1)}, {$limit: pageSize}
                        ]
                    }
                }
            ])

            const numberOfPages = Math.ceil((userOrders[0].totalCount[0]?.count || 0) / pageSize) || 1;
            response.status(200).json({
                user,
                pageNumber,
                numberOfPages,
                userOrders: userOrders[0].result
            });
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

const makeUserAdmin = async (request, response, next) => {
    try {
        const user = await User.findByIdAndUpdate(request.params.id, {isAdmin: true});
        if (!user) {
            errorHandler("User Not Found", 404, next);
            return;
        }
        response.status(200).json({message: "User Updated to be Admin"});
    } catch (error) {
        errorHandler("Invalid UserId", 400, next);
    }
}

const updateUserInfo = async (request, response, next) => {
    const {firstName, lastName, oldEmail, newEmail} = request.body.payload;

    if ((!firstName && !lastName && !newEmail) ||
        (oldEmail && !newEmail) || (!oldEmail && newEmail) ||
        (oldEmail && oldEmail !== request.user.email)) {
        errorHandler("Incorrect data", 400, next);
        return;
    }
    try {
        const user = request.user;
        user.firstName = firstName ? firstName : user.firstName;
        user.lastName = lastName ? lastName : user.lastName;
        user.email = newEmail ? newEmail : user.email;
        await user.save();
        response.status(200).json({message: "User Data Updated Successfully"})
    } catch (error) {
        errorHandler(error.message, 400, next)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    makeUserAdmin,
    updateUserInfo
};