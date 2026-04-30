'use strict'

const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8001;
require("./src/models/todoModel");


// MIDDLEWARES
app.use(express.json());


//MODELS



//ROUTES



app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));