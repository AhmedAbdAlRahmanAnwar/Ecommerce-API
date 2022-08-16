const Category = require("../modules/CategoryModule/model/category.model");
const {body} = require('express-validator');
const {isNumeric} = require("validator");

const isCategoryExist = (categoryId) => {
    return Category.findById(categoryId)
        .then(category => {
            if (!category) throw new Error("Category Not Found");
        })
}

const validateProductData = [
    body("payload").exists().withMessage("No Data provided for Product Creation"),
    body("payload.name").custom(name => !isNumeric(name))
        .withMessage("product name should be a string"),
    body("payload.description").custom(description => !isNumeric(description))
        .withMessage("product description should be a string"),
    body("payload.price").matches(/(^[1-9][0-9]*(.[0-9]+)?$)|(^0$)/)
        .withMessage("invalid price"),
    body("payload.quantity").matches(/(^[1-9][0-9]*$)|(^0$)/)
        .withMessage("invalid quantity"),
    body("payload.modelYear").matches(/(^[1-9][0-9]*$)|(^0$)/)
        .withMessage("invalid modelYear"),
    body("payload.category").isMongoId().withMessage("Invalid Category ID")
        .custom(categoryId => isCategoryExist(categoryId))
        .withMessage("Category Not Found")
]

const validateNewProductData = [
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
        .withMessage("Category Not Found")
]

module.exports = {
    validateNewProductData,
    validateProductData
}