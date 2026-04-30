'use strict';

const express = require('express');
const app = express();

const router = express.Router();
app.use(router);

require('dotenv').config();
const PORT = process.env.PORT || 8001;

// MIDDLEWARES
//? Her middleware bir handler'dir.
app.use(express.json()); //app.use ne yapiyor her request geldiginde bunu calistir diyoruz.Global

// app.use((req,res,next) => {
//      console.log(`Method: ${req.method}, URL: ${req.url}`);
//      next();
//  })

// app.get('/', (req, res) => {
//   res.send("Hello");
// });

// app.get('/sum', (req, res) => {
//   const num1 = Number(req.query.num1);
//   const num2 = Number(req.query.num2);

//   const sum = num1 + num2;

//   res.json({ result: sum });
// });

// app.get(/\/a(b|c)d?/, (req, res) => {
//   res.send("Matched");
// });

//MODELS

//ROUTES

router.get(/.*Hello$/, (req, res) => {
 res.send('<h1>Route Fourth</h1>')
})




// const students = [
//   {
//     id: 1,
//     name: 'Alex',
//   },
//   {
//     id: 2,
//     name: 'Steve',
//   },
// ];

//GET methodu ile tüm öğrencileri JSON formatında döndür.
// router.get("/students", (req, res) => {
//   res.json(students);
//  });

// //İstenen öğrencinin bilgilerini JSON formatında döndür.
// router.get("/students/:id", (req, res) => {
//   const id = Number(req.params.id);

//    const student = students.find((item) => item.id === id);

//    if (!student) {
//     return res.status(404).json({
//       message: "Student not found",
//      });
//    }

//    res.json(student);
// });

// const errorHandler = (err, req, res, next) => {
//   res.status(500).json({
//      message: err.message,
//    });
//  };

//  app.use((req, res, next) => {
//    throw new Error("Something went wrong!");
//  });
//  app.use(errorHandler);

app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));
