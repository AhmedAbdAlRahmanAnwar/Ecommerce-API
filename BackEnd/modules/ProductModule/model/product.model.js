const mongoose = require('mongoose');
const {isNumeric} = require('validator');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    rating: {
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
        unique:true,
        required: true,
        validate(name) {
            if (isNumeric(name)) {
                throw new Error("product name should be a string");
            }
        }
    },
    price: {
        type: Number,
        required: true,
        min:0,
        default: 0,
    },
    description: {
        type: String,
        required: true,
        validate(description) {
            if (isNumeric(description)) {
                throw new Error("product description should be a string");
            }
        }
    },
    modelYear: {
        type: Number,
        min: 0,
        max: new Date().getFullYear(),
    },
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
        min:0,
        default: 0,
    },
    numberOfSales:{
        type: Number,
        min:0,
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