const {body} = require('express-validator');
const {isNumeric} = require("validator");

module.exports = [
    body("payload").exists().withMessage("No review provided"),
    body("payload.productId").isMongoId().withMessage("Invalid Product Id"),
    body("payload.rating").isFloat({min:0,max:5}).withMessage("Rating must be a number between 0 and 5"),
    body("payload.comment").isString().custom(comment => !isNumeric(comment))
        .withMessage("comment should be a string")
]