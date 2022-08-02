const {query} = require('express-validator');

module.exports = [
    query("categoryId").optional().isMongoId().withMessage("Invalid CategoryId"),
    query("page").optional().isNumeric().withMessage("Page must be a number"),
    query("modelYearMin").optional()
        .matches(/(^[1-9][0-9]*$)|(^0{1}$)/)
        .withMessage("Minimum Model Year must be a number greater than or equal 0"),
    query("modelYearMax").optional()
        .matches(/(^[1-9][0-9]*$)|(^0{1}$)/)
        .withMessage("Max Model Year must be a number less than or equal current year"),
    query("priceMin").optional()
        .matches(/(^[1-9][0-9]*(.[0-9]+)?$)|(^0{1}$)/)
        .withMessage("Minimum Price must be a number"),
    query("priceMax").optional()
        .matches(/(^[1-9][0-9]*(.[0-9]+)?$)|(^0{1}$)/)
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