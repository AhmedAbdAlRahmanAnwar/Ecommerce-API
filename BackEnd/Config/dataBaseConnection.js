const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("DB connected successfully");
}).catch(error => {
    console.log("DB connection error " + error);
})