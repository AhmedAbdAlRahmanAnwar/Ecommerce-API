const User = require('./../model/user.model');
const errorHandler = require('./../../../Utilities/errorHandler');

const addNewAddress = (request, response, next) => {
    const {street, city, country, mobile} = request.body.payload;
    const stringAddressFormat = (street + city + country + mobile).toLowerCase();

    User.findById(request.user["_id"])
        .then(async user => {
            for (const address of user.address) {
                const {street, city, country, mobile} = address;
                const concatenatedAddress = street + city + country + mobile;
                if (concatenatedAddress === stringAddressFormat) {
                    errorHandler("Address Already exist", 400, next);
                    return;
                }
            }

            user.address.push(request.body.payload)
            await user.save();
            response.status(201).json({message: "address added"})
        })
        .catch(error => errorHandler(error.message, 400, next))
}

const updateAddress = (request, response, next) => {

}

const deleteAddress = (request, response, next) => {

}

module.exports = {
    addNewAddress,
    updateAddress,
    deleteAddress
}