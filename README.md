# Ecommerce-API
<br />
<h1 align="center">
  <a href="https://github.com/AhmedAbdAlRahmanAnwar/Ecommerce-API">
    <img src="https://hackernoon.com/hn-images/1*lAR9Uh_gJ7dp23e0vhy5Hg.png" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Ecommerce API</h3>
</h1>

<h4 align="center">Restful API for E-commerce web applications, built using NodeJS &amp; MongoDB</h4>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#deployment">Deployment</a>
    </li>
    <li>
      <a href="#key-features">Key Features</a>
    </li>
    <li>
      <a href="#api-usage">API Usage</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
  </ol>
</details>

## Deployment

Heroku Live Demo :  <a href="https://bazaar-shop-api.herokuapp.com">E-commerce API</a>

## Key Features

* Authentication
  * Login [Public]
  * SignUp [Public]
  * Logout [User]
* Password Management
  * Forgot Password [Public]
  * Reset Password  [Public]
  * Change Password [User]
* User
  * Get All Users [Admin]
  * Get User Data Using It's ID [Admin]
  * Update User Details [User]
  * Delete User Using It's ID [Admin]
  * Promote User To Admin Using It's ID [Admin]
* Address
  * Add New Address [User]
  * Update Address [User]
  * Delete Address Using It's ID [User]
* Review
  * Create New Review [User]
* Product
  * Query products [Public]
  * Query Product Using It's ID [Public]
  * Create new product [Admin]
  * Update Product Details [Admin]
  * Update Product Main Image [Admin]
  * Delete Product Using It's ID [Admin]
  * Get Products Based On Search Filters [Public]
* Favorite Services
  * Add Product to Favorite List [User]
  * Delete Product From Favorite List [User]
  * Empty Favorite List [User]
* Order
  * Create New Order [User]
  * Query Orders [Admin]
  * Query Order Using It's ID [Admin]
  * Cancel Order [User]
  * Update Order Status [Admin]
  * Get All My Orders [User]
  * Get Orders Based On Search Filters [User]
* Category
  * Create New Category [Admin]
  * Query Categories [Public]
  * Update Category Details [Admin]
  * Delete Category [Admin]

## API Usage

Check [API Documentation](https://bazaar-shop-api.herokuapp.com/api-docs/) for more info.

## Built With

List of any major frameworks used to build the project.

* [NodeJS](https://nodejs.org/) - JS runtime environment.
* [ExpressJS](https://expressjs.com/) - The NodeJS framework used.
* [MongoDB](https://www.mongodb.com/) - NoSQL Database uses JSON-like documents with optional schemas.
* [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and NodeJS.
* [Bcrypt](https://www.npmjs.com/package/argon2) - Encryption & Decryption Algorithm.
* [AWS S3](https://aws.amazon.com/s3/) - Cloud-based service for file storage.
* [AWS SDK Client](https://www.npmjs.com/package/@aws-sdk/client-s3) - AWS SDK for JavaScript S3 Client for Node.js, used to connect with s3 bucket.
* [Cors](https://www.npmjs.com/package/cors) - NodeJS package for providing a Connect/Express middleware that can be used to enable CORS.
* [Stripe](https://www.npmjs.com/package/stripe) - The Stripe Node library provides convenient access to the Stripe API from applications written in server-side JavaScript.
* [Express Mongo Sanitize](https://www.npmjs.com/package/express-mongo-sanitize) - Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
* [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a .env file into process.env.
* [Rate Limiter](https://www.npmjs.com/package/express-rate-limit) - Basic IP rate-limiting middleware for Express.
* [Axios](https://www.npmjs.com/package/axios) - Simple promise based HTTP client for the browser and node.js.
* [JWT](https://jwt.io/) - Compact URL-safe means of representing claims to be transferred between two parties.
* [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for NodeJS.
* [Winston](https://www.npmjs.com/package/winston) - A logger for just about everything.
* [Multer](https://www.npmjs.com/package/multer) - NodeJS middleware for handling multipart/form-data.
* [Multer S3](https://www.npmjs.com/package/multer-s3) - Streaming multer storage engine for AWS S3.
* [Nodemailer](https://www.npmjs.com/package/nodemailer) - Easy as cake e-mail sending from your Node.js applications.
* [Nodemailer Sendgrid Transport](https://www.npmjs.com/package/nodemailer-sendgrid-transport) - This module is a transport plugin for Nodemailer that makes it possible to send through SendGrid's Web API.
* [Validator](https://www.npmjs.com/package/validator) - A library of string validators and sanitizers.
* [Express Validator](https://www.npmjs.com/package/express-validator) - A set of express middlewares that wraps validator.js validator.
* [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) - Allows you to serve auto-generated swagger-ui generated API docs from express.
* [UUID](https://www.npmjs.com/package/uuid) - For the creation of RFC4122 UUIDs (To Generate Random UUID).
* [Mongoose Sequence](https://www.npmjs.com/package/mongoose-sequence) - This plugin lets you create fields which autoincrement their value.

## Installation

1. You can fork the app or you can git-clone the app into your local machine.
2. Install all the dependencies by running
```
$ npm install
```
3. Set your env variables. (Open example.env)
4. Run the Server
```
$ npm start
```
