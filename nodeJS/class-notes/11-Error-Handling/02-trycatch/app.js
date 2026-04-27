'use strict';

//* TEMEL Başlangıç kodlarımız
// -------------------------------------------------
const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 3000;
// -------------------------------------------------

const ürünler = [
  { id: 1, isim: 'Laptop', fiyat: 15000 },
  { id: 2, isim: 'Telefon', fiyat: 8000 },
];

app.all('/urun/:id', (req, res, next) => {
  try {
    console.log(req.params.id);

    const id = req.params.id;
    if (isNaN(id)) {
      res.errorStatusCode = 400;
      throw new Error('ID sayı olmalıdır');
    }

    const urun = ürünler.find(u => u.id === Number(id));
    if (!urun) {
      res.errorStatusCode = 404;
      throw new Error('Ürün bulunamadı');
    }

    res.json({ error: false, urun });
  } catch (error) {
    next(error); // hatayı error handler'a ilet
  }
});

app.use((err, req, res, next) => {
  const statusCode = res.errorStatusCode ?? 500;
  res.status(statusCode).json({ error: true, message: err.message });
});

app.listen(PORT, () => console.log('Çalışıyor: www.localhost:' + PORT));
