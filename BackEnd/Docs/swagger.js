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
        }
    }
}

module.exports = docs;