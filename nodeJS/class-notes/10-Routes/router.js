'use strict'
/*--------------------------------------*
                Routes
/*--------------------------------------*/


const express = require('express');//su an sadece tanimladik express frameworkunu alttaki satirda degiskene atmis oluyouzr calismis halini.
const app = express();//bunu bir degiskene atayalim ki degisken üzerinden devam edebilelim. express() bu sekilde calistirmis oluyoruz calisan uygulamayi degiskene atiyouz
// app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT ?? 8000;

// /*-------------------------------------*/
// /*send dedigimizde herseyi gönderir number number olarak gider. obje obje olarak gider.vs..*/
// // app.route('/').get((req, res) => res.send({ method :"get"}))

// //* 'Router' is special app for URL control in express
// const router = express.Router(); // Router express icinde ordan aliyoruz

// // router.get('/',(req, res)=> res.send({method:"get"}))

// router.route("/")
//     .get((req,res) => res.send({method:"get"}))
//     .post((req,res) => res.send({method:"post"}))
//     .delete((req,res) => res.send({method:"delete"}))

const userRouter = require('./routes/user');
app.use(userRouter)
// app.use(router); // middleware and routes are used to make app being aware of others.

//* Import router

// const router = require('./routes/index.js');
// const router = require('./routes/index');
const router = require('./routes');
app.use(router)

/* ----------------------------------------- */
app.listen(PORT, () => console.log("Running at : http://127.0.0.1:8000"));



























//aslinda listen 3 parametre alir. birincisi host parametresi ama default olarak locali kasteettigi icin yazmamiza gerek yok

//* Import router

const router = require('./routes/index')
app.use(router)


app.listen(PORT, () => console.log('Sunucu çalışıyor: http://127.0.0.1:8000 '));