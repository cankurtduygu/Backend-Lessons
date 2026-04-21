// console.log("server2.js calisti");

// const express = require('express');

// const app = express();

// app.listen(8000, () => {
//   console.log('server calisti : 8000 portu');
// });

//Yukaridaki hali ile cannot get mesaji aliriz cunku node da daha önce yaptigimiz gibi response dönmedik su an.

const express = require('express');

const app = express();

app.set('view engine', 'ejs')

//GET; POST; PUT; DELETE -> HTTP METHODS APP ÜZERINDEN APP:GET VS: KULLANACGIMIZ YAPI AMA BIZ TEMELINI ÖGRENDIGIMIZ ICIN USE KULLANACAGIZ
app.use('/about', (req, res) => {
    // res.send('burasi espree ile olusan hakkimda sayfasi...')
    res.json({mesaage: "hakkimda sayfasi"}) //json da döndürebiliriz.
})


app.use('/', (req, res) => {
    // res.send('burasi espree ile olusan ana sayfa...')
    res.json({mesaage: "ana sayfa"}) //json da döndürebiliriz.
});


app.listen(8000, () => {
  console.log('server calisti : 8000 portu');
});