const Category = require('./../model/category.model');
const asyncHandler = require('express-async-handler');

const getAllCategories = asyncHandler(async (request, response) => {
    const categories = await Category.find({}).select("categoryName -_id");
    if (categories){
        response.status(200).json({categories});
    }else{
        throw new Error();
    }
})

const createCategories = asyncHandler(async (request, response) => {
    const {categoryName,categoryDescription} = request.body.payload;
    const category = await Category.create({categoryName,categoryDescription})
    if (category){
        response.status(201).json({message: "category added"});
    }else{
        throw new Error("Can't Create Category")
    }
})

module.exports = {
    getAllCategories,
    createCategories
}