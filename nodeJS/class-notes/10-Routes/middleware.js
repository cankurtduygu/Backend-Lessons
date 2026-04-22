'use strict'
/*--------------------------------------*
                Middlewares
/*--------------------------------------*/

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ?? 8001
/*--------------------------------------*/

//* Middleware is a function and must have tree parameters.(functional middleware)

const middlewareA = (req, res, next) => {
    console.log("middleware A worked");
    next()
};

//1. way /runs for each request

app.use(middlewareA)

app.get('/', (req,res)=> res.send({
    message:"home path"
}))

app.get('/users', (req,res)=> res.send({
    message:"user path"
}))

               








app.listen(PORT, () => console.log(`Sunucu çalışıyor: http://127.0.0.1:${PORT}`));
/*--------------------------------------*/