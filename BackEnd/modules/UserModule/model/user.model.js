const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require("bcrypt");
const {isEmail, isMobilePhone, isNumeric} = require("validator");

const userAddress = new mongoose.Schema({
    _id: Number,
    street: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(city) {
            if (isNumeric(city)) {
                throw new Error("City should be a string");
            }
        }

    },
    country: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(country) {
            if (isNumeric(country)) {
                throw new Error("Country should be a string");
            }
        }
    },
    mobile: {
        type: String,
        validate(mobile) {
            if (!isMobilePhone(mobile)) {
                throw new Error("Phone Number is not valid");
            }
        }
    }
},{ _id: false })

userAddress.plugin(AutoIncrement);

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(email) {
            if (!isEmail(email)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*([A-Z])+)(?=.*[!@#$&*]+)(?=.*[0-9]+)(?=.*[a-z]+).{8,}$/,
        trim: true,
    },
    resetPasswordToken: String,
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
    address: [userAddress],
    wishlist: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        }
    }]
}, {timestamps: true});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

module.exports = mongoose.model("Users", userSchema);