const express = require('express');
const router = express.Router();
const {authUser, isAdmin} = require('./../../../MiddleWares/authMiddleWare');
const upload = require('./../../../MiddleWares/uploadMiddleWare');
const queryValidator = require('./../../../Validators/filterProductsQueryValidator');
const validationMW = require('./../../../MiddleWares/validationMiddleWare');
const {validateProductData, validateNewProductData}
    = require('./../../../Validators/productDetailsValidator');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductDetails,
    updateProductImage,
    deleteProduct,
    getFilteredProducts,
    validateProduct
}
    = require('./../controller/product.controller');

router.route("/product")
    .get(getAllProducts)
    .put(authUser, isAdmin, validateNewProductData, validationMW, updateProductDetails)
    .post(authUser, isAdmin, upload.single('image'), createProduct)
    .delete(authUser, isAdmin, deleteProduct)

router.post("/product/validateNewProduct",
    authUser,
    isAdmin,
    validateProductData,
    validationMW,
    validateProduct);

router.get("/product/filter", queryValidator, validationMW, getFilteredProducts);
router.get("/product/:id", getProductById);
router.patch("/product/image", authUser, isAdmin, upload.single('image'), updateProductImage);

module.exports = router;