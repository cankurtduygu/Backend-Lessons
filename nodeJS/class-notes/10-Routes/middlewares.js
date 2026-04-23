'use strict';
/* ----------------------------------------- */
//              Middlewares
/* ----------------------------------------- */
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ?? 8001;
/* ----------------------------------------- */
//* Middleware is a function and must have three parameters. (functional middleware)

const middlewareA = (req, res, next) => {
    console.log('middleware A worked')
    next()
};

const middlewareB = (req, res, next) => {
    console.log('middleware B worked')
    next()
};

//?1. way / runs for each request / position of middlewares are important
// app.use(middlewareA);
// app.use(middlewareB);

//? 2. way / runs for each request 
// app.use(middlewareA, middlewareB);

//? 3. way / specific route
// app.use('/', middlewareA, middlewareB) // this is default path '/'
// app.use('/', middlewareA) // it will work even in users path

// app.use("/firms", middlewareA);
// app.use("/users", middlewareB);

//? how to choose specific method
// app.post("/users", middlewareB);


//? 4. way / you can use them between route and controller
// app.get("/", [middlewareA, middlewareB], (req, res) =>
//   res.send({
//     message: "home path",
//   }),
// );

// app.get('/', (req, res) =>
//   res.send({
//     message: 'home path',
//   })
// );

// app.get('/users', (req, res) =>
//   res.send({
//     message: 'users path',
//   })
// );

// app.post('/users', (req, res) =>
//   res.send({
//     message: 'users path - post',
//   })
// );

// app.get('/firms', (req, res) =>
//   res.send({
//     message: 'firms path',
//   })
// );


/* ----------------------------------------- *
//* Middleware routing and sending data one to another.*/

// app.get('/', (req, res, next)=>{
//     console.log("message 1");
//     // console.log(typeof req);

//     // const obj = {
//     //     a:1
//     // }

//     // obj.b =2;
//     // console.log(obj);

//     req.message1 = 'middleware 1'

//     next();
// })

// app.get("/", (req, res, next) => {
//  req.message2 = "middleware 2";

// console.log(req);

//   next();
// });

// app.get('/', (req,res) => {

//     console.log(req);
//     res.send({
//         message1: req.message1,
//         message2: req.message2,
//     })
// })


//* import from middleware folder

// 1. way
// const middlewares = require("./middlewares");

// app.use(middlewares.middleFunc1)
// app.use(middlewares.middleFunc2)

// 2. way
const { middleFunc1, middleFunc2 } = require("./middlewares");

app.use(middleFunc1);
app.use(middleFunc2);

app.get("/", (req, res) => {
  res.send({
    message1: req.message1,
    message2: req.message2,
  });
});
/* ----------------------------------------- */
app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));
/* ----------------------------------------- */
