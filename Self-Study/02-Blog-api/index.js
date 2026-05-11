"use strict";
const express= require('express');
const app= express();


require("dotenv").config();
const PORT = process.env.PORT;

const dbConnection = require('./src/config/dbConnection');
dbConnection();


app.use(express.json());

app.all("/", (req, res) => {
  res.send({
    message:'WELCOME TO BLOG API'
  });
});

app.use("/blogs", require("./src/routes/blogRouter"));


app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));