'use strict'


const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ch11-blog-api")
        .then(()=>console.log("* DB Connected *"))
        .catch((err)=> console.log("! DB NOT CONNECTED"))
}

module.exports = dbConnection