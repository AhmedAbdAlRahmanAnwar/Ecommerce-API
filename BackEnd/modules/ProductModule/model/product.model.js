const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    rate: {
        type: Number,
        required: true,
        max:5,
        min:0,
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true
    },
    modelYear: Number,
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
        max:5,
        min:0,
        default: 0
    },
    reviews: [reviewSchema],
}, {timestamps: true})

module.exports = mongoose.model("Products", productSchema);