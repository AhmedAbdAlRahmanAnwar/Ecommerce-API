const {login, signUp, logout, forgetPassword, resetPassword, changePassword} = require('./auth.swagger');
const {getAllUsers, getUserById, deleteUser, makeUserAdmin, updateUser} = require('./user.swagger');

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
        '/forgetPassword':{
            post: forgetPassword
        },
        '/resetPassword':{
            post: resetPassword
        },
        '/changePassword':{
            patch: changePassword
        },
        '/user':{
            get: getAllUsers
        },
        '/user/:id':{
            get: getUserById
        },
        // '/user/:id':{
        //     delete: deleteUser
        // },
        // '/user':{
        //     patch: updateUser
        // },
        // '/user/addAdmin/:id':{
        //     patch: makeUserAdmin
        // },
    }
}

module.exports = docs;