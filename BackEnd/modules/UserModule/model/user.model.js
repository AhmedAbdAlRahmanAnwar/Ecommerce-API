const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require("bcrypt");
const {isEmail,isMobilePhone} = require("validator");

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
        validate(number) {
            if (!isMobilePhone(number)) {
                const error = new Error("Phone Number is not valid");
                error.status = 422;
                throw error;
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
        lowerCase: true,
        unique: true,
        validate(email) {
            if (!isEmail(email)) {
                const error = new Error("Email is not valid");
                error.status = 422;
                throw error;
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    address: [userAddress],
    wishlist: [{
        id: mongoose.Schema.Types.ObjectId,
        // ref: "Products"
    }]
}, {timestamps: true});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

module.exports = mongoose.model("Users", userSchema);