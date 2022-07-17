const express = require("express");
const userRoute = require('./modules/UserModule/route/user.route');
const productRoute = require('./modules/ProductModule/route/product.route');
const orderRoute = require('./modules/OrderModule/route/order.route');
const categoryRoute = require('./modules/CategoryModule/route/category.route');
const server = express();

/**********************Development packages***************************/
const morgan = require('morgan');

//1- Connection to DataBase
require('./Config/dataBaseConnection');

//2- Logging Middleware   /************ Development ***************/
server.use(morgan(':url :method'));

//3- CORS Middleware
// server.use(cors());

//4- /************ End Point (Routes) ************/
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(userRoute);
// server.use(productRoute);
// server.use(orderRoute);
// server.use(categoryRoute);

//5- Not Found Middleware
server.use((request, response) => {
    response.status(404).json({message: "Not Found"});
})

//6- Error Middleware
server.use((error, request, response, next) => {
    const status = error.statusCode || 500;
    response.status(status).json({message:"Internal Error " + error})
})