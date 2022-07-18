require('dotenv').config();
const express = require("express");
const server = express();
const PORT = process.env.PORT;

const userRoute = require('./modules/UserModule/route/user.route');
const productRoute = require('./modules/ProductModule/route/product.route');
const orderRoute = require('./modules/OrderModule/route/order.route');
const categoryRoute = require('./modules/CategoryModule/route/category.route');
const errorHandler = require('./MiddleWares/errorMiddleWare');
const notFound = require('./MiddleWares/notFoundMiddleWare');

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
server.use(express.urlencoded({extended: true}));
server.get("/",(req,res)=>{
    res.end();
})
server.use(userRoute);
// server.use(productRoute);
// server.use(orderRoute);
// server.use(categoryRoute);

//5- Not Found Middleware
server.use(notFound);

//6- Error Middleware
server.use(errorHandler);

server.listen(process.env.PORT || 3000, () => {
    console.log("listening on port " + PORT);
})