require('dotenv').config();
const express = require("express");
//const path = require('path');

const cors = require('cors');
const PORT = process.env.PORT || 3000;

const mongoSanitize = require('express-mongo-sanitize');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Docs/swagger');
const limiter = require('./MiddleWares/rateLimiter');
const morganMiddleWare = require('./MiddleWares/morganMiddleWare');
const userRoute = require('./modules/UserModule/route/user.route');
const orderRoute = require('./modules/OrderModule/route/order.route');
const reviewRoute = require('./modules/ReviewModule/route/review.route');
const productRoute = require('./modules/ProductModule/route/product.route');
const authRoute = require('./modules/AuthenticationModule/route/auth.route');
const categoryRoute = require('./modules/CategoryModule/route/category.route');
const errorHandler = require('./MiddleWares/errorMiddleWare');
const notFound = require('./MiddleWares/notFoundMiddleWare');

const server = express();
server.enable('trust proxy');
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//1- Connection to DataBase
require('./Config/dataBaseConnection');

//2- Logging Middleware   /************ Development ***************/
server.use(morganMiddleWare);

//3- MongoDB data sanitization
server.use(mongoSanitize());

//4- CORS Middleware
server.use(cors());

//5- End Point (Routes)
server.use(limiter);
server.get("/", (req, res) => res.end());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
server.get("/logs",(req,res,next)=>{
   res.download(path.join(__dirname,'../logs/all.log'))
});
*/

server.use(authRoute);
server.use(userRoute);
server.use(productRoute);
server.use(orderRoute);
server.use(reviewRoute);
server.use(categoryRoute);

//6- Not Found Middleware
server.use(notFound);

//7- Error Middleware
server.use(errorHandler);

server.listen(PORT, () => {
    console.log("listening on port " + PORT);
})