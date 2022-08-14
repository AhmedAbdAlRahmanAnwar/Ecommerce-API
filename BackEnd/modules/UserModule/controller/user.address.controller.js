const errorHandler = require('./../../../Utilities/errorHandler');
const {isNumeric} = require("validator");

const addNewAddress = async (request, response, next) => {
    const {street, city, country, mobile} = request.body.payload;
    const stringAddressFormat = (street + city + country + mobile).toLowerCase();
    const user = request.user;

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
}

const updateAddress = async (request, response, next) => {
    const {addressId, payload} = request.body;
    if (!addressId || !isNumeric(addressId.toString())) {
        errorHandler("Invalid Address ID", 400, next);
        return;
    }
    if (!payload) {
        errorHandler("No Updates Provided", 400, next);
        return;
    }

    const updates = Object.keys(request.body.payload)
    const allowedUpdates = ["street", "city", "country", "mobile"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        errorHandler("Invalid Update!", 400, next);
        return;
    }

    const user = request.user;
    const addressIndex = user.address.findIndex(address => address["_id"] === +addressId);
    if (addressIndex === -1) {
        errorHandler("Address id doesn't exist", 400, next);
        return;
    }
    updates.forEach(update => {
        user.address[addressIndex][update] = request.body.payload[update]
    })
    await user.save();
    response.status(200).json({message: "address updated"});
}

const deleteAddress = async (request, response, next) => {
    const user = request.user;
    const addressIndex = user.address.findIndex(address => address["_id"] === +request.params.id);
    if (addressIndex === -1) {
        errorHandler("Address id doesn't exist", 400, next);
        return;
    }
    user.address.splice(addressIndex, 1);
    await user.save();
    response.status(200).json({message: "address deleted"});
}

module.exports = {
    addNewAddress,
    updateAddress,
    deleteAddress
}