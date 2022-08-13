const Category = require("../modules/CategoryModule/model/category.model");
const {body} = require('express-validator');
const {isNumeric} = require("validator");

const isCategoryExist = (categoryId) => {
    return Category.findById(categoryId)
        .then(category => {
            if (!category) {
                throw new Error("invalid category, not found")
            }
        })
}

module.exports = [
    body("payload")
        .custom(payload => !(("image" in payload) || ("rating" in payload) || ("numberOfSales" in payload)))
        .withMessage("not allowed updates"),
    body("payload.name").optional()
        .custom(name => !isNumeric(name))
        .withMessage("product name should be a string"),
    body("payload.description").optional()
        .custom(description => !isNumeric(description))
        .withMessage("product description should be a string"),
    body("payload.price").optional()
        .matches(/(^[1-9][0-9]*(.[0-9]+)?$)|(^0$)/)
        .withMessage("invalid price"),
    body("payload.quantity").optional()
        .matches(/(^[1-9][0-9]*$)|(^0$)/)
        .withMessage("invalid quantity"),
    body("payload.modelYear").optional()
        .matches(/(^[1-9][0-9]*$)|(^0$)/)
        .withMessage("invalid modelYear"),
    body("payload.category").optional()
        .isMongoId().withMessage("invalid category")
        .custom(categoryId => isCategoryExist(categoryId))
]