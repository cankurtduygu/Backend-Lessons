'use strict';
/*********************************** */
// /bolme/:a/:b route'u:
// → a veya b rakam değilse: 400 + 'Sayılar rakam olmalıdır'
// → b sıfırsa: 400 + 'Sıfıra bölme yapılamaz'
// → Başarılıysa: { error: false, sonuc: a/b }
// try-catch KULLANMA — sadece throw.
/********************************** */
//* TEMEL Başlangıç kodlarımız
// -------------------------------------------------
const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// -------------------------------------------------

app.get('/bolme/:a/:b', (req, res, next) => {
  console.log('id', req.params);
  
  console.log(isNaN(2+null));

  const idObje = req.params;

  if (isNaN(idObje.a)||isNaN(idObje.b)) {
    res.errorStatusCode = 400;
    throw new Error('ID sayı olmalıdır');
  }

  if (Number(idObje.b)===0) {
    res.errorStatusCode = 400;
    throw new Error('Sifira bölme yapilamaz');
  }

  const sonuc = Number(idObje.a/idObje.b);

  console.log(sonuc)

  res.json({ 
    error:false,
    message: `Bölme islemi sonucu: ${sonuc}`, });
});


const Error_Handler = (err, req, res, next) => {
 console.error("Hata:", err.message);

 const statusCode = res.errorStatusCode ?? 500;
 res.status(statusCode).json({
    error:true,
    message:err.message,
 })
}

app.use(Error_Handler);

app.listen(PORT, () => console.log('Çalışıyor: www.localhost:' + PORT));
