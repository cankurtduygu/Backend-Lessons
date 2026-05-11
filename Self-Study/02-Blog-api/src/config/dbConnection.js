const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose.connect(process.env?.MONGODB_URI || "mongodb://localhost:27017/self-blog-api")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error:", err));
}

module.exports = dbConnection;