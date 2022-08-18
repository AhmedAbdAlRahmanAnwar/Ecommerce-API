const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    shippingAddress: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        mobile: {type: String, required: true},
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected', 'shipped', 'delivered', 'cancelled']
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'card']
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {timestamps: true})

module.exports = mongoose.model("Orders", orderSchema);