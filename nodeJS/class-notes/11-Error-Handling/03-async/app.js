'use strict';

//* TEMEL Başlangıç kodlarımız
// -------------------------------------------------
const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 3000;
// -------------------------------------------------

const dbdenGetir = async id => {
  await new Promise(resolve => setTimeout(resolve, 50));

  if (id > 10 || id < 1) {
    throw new Error('Bu ID veritabanında yok');
  }

  return { id, isim: 'Test', fiyat: 1000 };
};

app.all('/urun/:id', async (req, res, next) => {
  // try {
  //   const urun = await dbdenGetir(Number(req.params.id));
  //   res.json(urun);
  // } catch (error) {
  //   next(error);
  // }

  const urun = await dbdenGetir(Number(req.params.id)).catch(next);
  res.json(urun);
});

app.use((err, req, res, next) => {
  const statusCode = res.errorStatusCode ?? 500;
  res.status(statusCode).json({ error: true, message: err.message });
});

app.listen(PORT, () => console.log('Çalışıyor: www.localhost:' + PORT));
