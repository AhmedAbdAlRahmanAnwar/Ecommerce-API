require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const server = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env["MONGO_URL"], {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
})
    .then(() => {
        console.log("DB connected successfully");
        server.listen(PORT, () => {
            console.log("listening on port " + PORT);
        })
    })
    .catch(error => {
        console.log("DB connection error " + error);
    })