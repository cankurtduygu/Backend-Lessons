'use strict';

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ?? 8000;
app.use(express.json());

app.use((req,res,next) => {
    req.id = Math.random();
    req.user = "Duygu";
    console.log("middleware", req.id);
    next();
})
// app.get('/',(req,res)=> {
//     console.log("route:", req.id);
//      res.json({
//     path: 'home',
//     id: req.id,
//     user: req.user
//   });
// })




app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});