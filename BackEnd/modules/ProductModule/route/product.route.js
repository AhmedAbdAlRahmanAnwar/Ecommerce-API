const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const upload = require('./../../../MiddleWares/uploadMiddleWare');
const productValidator = require('./../../../Validators/productDetailsValidator');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductDetails,
    updateProductImage,
    deleteProduct,
    getFilteredProducts
}
    = require('./../controller/product.controller');

router.route("/product")
    .get(getAllProducts)
    .put(authUser, isAdmin, productValidator, validationMW, updateProductDetails)
    .post(authUser, isAdmin, upload.single('image'), createProduct)
    .delete(authUser, isAdmin, deleteProduct)

router.get("/product/filter", getFilteredProducts)
router.get("/product/:id", getProductById)
router.patch("/product/image", authUser, isAdmin, upload.single('image'), updateProductImage)

router.route("/product/review")
    .post()
    .delete()


module.exports = router;