const Order = require('./../model/order.model');
const addPagination = require('./../../../Utilities/addPagination');
const mongoose = require("mongoose");

module.exports = async (request, response) => {
    const {userName, status, sortByDate, orderId, page = 1} = request.query;
    const match = {}, sort = {_id: 1};
    const {pageNumber, pageSize} = await addPagination(Order, page);

    if (userName) {
        const [firstName, lastName] = userName.split(" ");
        match["user.firstName"] = {$regex: firstName, $options: "i"};
        if (lastName) match["user.lastName"] = {$regex: lastName, $options: "i"};
    }

    if (status) match["status"] = status;
    if (orderId) match["_id"] = mongoose.Types.ObjectId(orderId);

    if (sortByDate) {
        delete sort["_id"];
        if (sortByDate === "lth") {
            sort["createdAt"] = 1;
        } else if (sortByDate === "htl") {
            sort["createdAt"] = -1;
        }
    }

    const orders = await Order.aggregate([
        {
            $lookup: {
                from: "users",
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                "user._id": 0,
                "user.email": 0,
                "user.password": 0,
                "user.isAdmin": 0,
                "user.address": 0,
                "user.wishlist": 0,
                "user.createdAt": 0,
                "user.updatedAt": 0,
                "user.isLoggedIn": 0,
                "user.__v": 0,
                "user.resetPasswordToken": 0,
            }
        },
        {
            $match: match
        },
        {
            $sort: sort
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
    const numberOfPages = Math.ceil((orders[0].totalCount[0]?.count || 0) / pageSize) || 1;
    response.status(200).json({
        pageNumber,
        numberOfPages,
        orders: orders[0].result
    });
}