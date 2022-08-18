const {body} = require('express-validator');

const validateNewAddressData = [
    body("payload").exists().withMessage("No address data provided"),
    body("payload.street").matches(/^[a-zA-Z0-9 ,]{3,}$/).withMessage("street should be a string"),
    body("payload.city").matches(/^[a-zA-Z]{3,}( +[a-zA-Z]{3,})?$/).withMessage("city should be a string"),
    body("payload.country").matches(/^[a-zA-Z]{3,}( +[a-zA-Z]{3,})?$/).withMessage("country should be a string"),
    body("payload.mobile").isMobilePhone().withMessage("mobile should be a number")
]

const validateUpdatedAddressData = [
    body("addressId").isNumeric().withMessage("Invalid Address ID"),
    body("payload").exists().withMessage("No Updated Address Data provided"),
    body("payload.street").optional().matches(/^[a-zA-Z0-9 ,]{3,}$/).withMessage("street should be a string"),
    body("payload.city").optional().matches(/^[a-zA-Z]{3,}( +[a-zA-Z]{3,})?$/).withMessage("city should be a string"),
    body("payload.country").optional().matches(/^[a-zA-Z]{3,}( +[a-zA-Z]{3,})?$/).withMessage("country should be a string"),
    body("payload.mobile").optional().isMobilePhone().withMessage("mobile should be a number")
]

module.exports = {
    validateNewAddressData,
    validateUpdatedAddressData
}