const express = require('express');
const router = express.Router();
const {getAllCategories, createCategories, deleteCategory, updateCategory} = require('./../controller/category.controller');
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare')

router.route("/category")
    .get(getAllCategories)
    .post(authUser, isAdmin, createCategories)
    .put(authUser, isAdmin, updateCategory)
    .delete(authUser, isAdmin, deleteCategory)

module.exports = router;