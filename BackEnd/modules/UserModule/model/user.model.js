const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require("bcrypt");
const {isEmail, isMobilePhone} = require("validator");

const userAddress = new mongoose.Schema({
    id: Number,
    street: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        validate(mobile) {
            if (!isMobilePhone(mobile)) {
                throw new Error("Phone Number is not valid");
            }
        }
    }
})

userAddress.plugin(AutoIncrement, {id: "address_id_Counter", inc_field: 'id'});

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
        match: /^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,}$/,
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