const {query} = require('express-validator');

const productFilterQueryValidator = [
    query("categoryId").optional().isMongoId().withMessage("Invalid CategoryId"),
    query("page").optional().isNumeric().withMessage("Page must be a number"),
    query("modelYearMin").optional()
        .matches(/(^[1-9][0-9]*$)|(^0$)/)
        .withMessage("Minimum Model Year must be a number greater than or equal 0"),
    query("modelYearMax").optional()
        .matches(/(^[1-9][0-9]*$)|(^0$)/)
        .withMessage("Max Model Year must be a number less than or equal current year"),
    query("priceMin").optional()
        .matches(/(^[1-9][0-9]*(.[0-9]+)?$)|(^0$)/)
        .withMessage("Minimum Price must be a number"),
    query("priceMax").optional()
        .matches(/(^[1-9][0-9]*(.[0-9]+)?$)|(^0$)/)
        .withMessage("Max Price must be a number"),
    query("rating").optional()
        .isFloat({min:0,max:5}).withMessage("Rating must be a number between 0 and 5"),
    query("priceSort").optional()
        .isIn(["lth","htl"]).withMessage("Invalid Sort Query, Query must be htl or lth"),
    query("modelYearSort").optional()
        .isIn(["lth","htl"]).withMessage("Invalid Sort Query, Query must be htl or lth"),
    query("ratingSort").optional()
        .isIn(["lth","htl"]).withMessage("Invalid Sort Query, Query must be htl or lth"),
]

const orderFilterQueryValidator = [
    query("orderId").optional().isMongoId().withMessage("Invalid orderId"),
    query("page").optional().isNumeric().withMessage("Page must be a number"),
    query("sortByDate").optional()
        .isIn(["lth","htl"]).withMessage("Invalid Sort Query, Query must be htl or lth"),
    query("status").optional()
        .isIn(['pending', 'accepted', 'rejected', 'shipped', 'delivered', 'cancelled'])
        .withMessage("Invalid status"),
    query("userName").optional()
        .isString().withMessage("userName should be a string")
        .matches(/^\w{3,}( \w{3,})?$/g)
        .withMessage("userName should has minimum length of 3 characters"),
]

module.exports = {
    productFilterQueryValidator,
    orderFilterQueryValidator
}