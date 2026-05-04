'use strict'

/*---------------------------*/
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

/*---------------------------*/
//! Parse body data
app.use(express.json())
/*---------------------------*/


//! DB Connection

const dbConnection = require('./src/dbConnection');
dbConnection();


//! Routes

app.all('/', (req,res)=> {
    res.send('WELCOME TO BLOG API')
})

// blog route
app.use(require('./src/routes/blogRouter'))


/*---------------------------*/
//! Error Handler
app.use(require("./src/middlewares/errorHandler"));





/*---------------------------*/
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT));