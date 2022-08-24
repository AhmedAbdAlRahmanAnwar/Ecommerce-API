const {addReview} = require('./review.swagger');
const {
    login,
    signUp,
    logout,
    forgetPassword,
    resetPassword,
    changePassword
} = require('./auth.swagger');

const {
    getAllUsers,
    getUserById,
    deleteUser,
    makeUserAdmin,
    updateUser,
    addNewAddress,
    updateAddress,
    deleteAddress,
    addProductToWishlist,
    deleteProductFromWishlist,
    clearWishlist
} = require('./user.swagger');

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductDetails,
    updateProductImage,
    deleteProduct,
    getFilteredProducts,
    productDataIsValid
} = require('./product.swagger');

const {
    createOrder,
    getAllOrders,
    getOrderById,
    getMyOrders,
    cancelOrder,
    updateStock,
    updateOrderStatus,
    filterOrders
} = require('./order.swagger');

const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('./category.swagger');

const docs = {
    openapi: '3.0.3',
    info: {
        title: 'Bazaar Shop Ecommerce API',
        description: 'An API for E-commerce built using NodeJS & MongoDB',
        version: '1.0.0',
        contact: {
            name: 'Ahmed Anwar',
            email: 'ahmedabdalrahman61@gmail.com',
            url: 'https://github.com/AhmedAbdAlRahmanAnwar'
        }
    },
    servers: [
        {
            url: 'https://bazaar-shop-api.herokuapp.com/',
            description: 'Production Server'
        },
        {
            url: 'http://localhost:3000',
            description: 'Development Server'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                in: 'header',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
    paths: {
        '/login': {
            post: login
        },
        '/signup': {
            post: signUp
        },
        '/logout': {
            post: logout,
        },
        '/forgetPassword': {
            post: forgetPassword
        },
        '/resetPassword': {
            post: resetPassword
        },
        '/changePassword': {
            patch: changePassword
        },
        '/user': {
            get: getAllUsers,
            patch: updateUser
        },
        '/user/:id': {
            get: getUserById,
            delete: deleteUser
        },
        '/user/addAdmin/:id': {
            patch: makeUserAdmin
        },
        '/user/address': {
            post: addNewAddress,
            put: updateAddress
        },
        '/user/address/:id': {
            delete: deleteAddress
        },
        '/user/wishlist': {
            put: addProductToWishlist,
            delete: deleteProductFromWishlist
        },
        '/user/wishlist/clear': {
            delete: clearWishlist
        },
        '/product': {
            get: getAllProducts,
            post: createProduct,
            put: updateProductDetails,
            delete: deleteProduct
        },
        '/product/image': {
            patch: updateProductImage
        },
        '/product/:id': {
            get: getProductById
        },
        '/product/filter': {
            get: getFilteredProducts
        },
        '/product/validateNewProduct': {
            post: productDataIsValid
        },
        '/order':{
            get:getAllOrders,
            post:createOrder,
            patch:updateOrderStatus
        },
        '/order/me':{
            get:getMyOrders
        },
        '/order/:id':{
            get:getOrderById,
            patch:cancelOrder
        },
        '/order/filter':{
            get:filterOrders
        },
        '/order/success/:id':{
            get:updateStock
        },
        '/review': {
            post: addReview
        },
        '/category':{
            get:getAllCategories,
            post:createCategory,
            put:updateCategory,
            delete:deleteCategory
        }
    }
}

module.exports = docs;