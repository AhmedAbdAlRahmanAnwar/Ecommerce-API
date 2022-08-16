const {login} = require('./auth.swagger');

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
    security: {
        bearerAuth:[]
    },
    paths: {
        '/login':{
            post: login
        }
    }
}

module.exports = docs;