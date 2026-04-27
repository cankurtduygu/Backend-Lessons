"use strict"
/*--------------------------------------*
                Throw
/*--------------------------------------*/

const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT ?? 8000;


const urunler = [
    {id:1, isim: "Laptop", fiyat: 15000},
    {id:2, isim: "Laptop", fiyat: 15000},
]

app.get('/urunler/:id', (req, res) => {
  console.log('Params: ', req.params);
  const id = Number(req.params.id); 

  const urun = urunler.find(u => u.id === id);

  //* id sayi mi kontrolü
  if (isNaN(id)) {
    res.errorStatusCode = 400;
    throw new Error('ID sayı olmalıdır');
  }

  //* Ürün var mi kontrolu
  if (!urun) {
   res.errorStatusCode = 404;
   console.log(res);
   throw new Error("hata: Ürün bulunamadı" );
  }
  res.json(urun);
});

//* Error handler 4 parametreli özel middleware
//throw gördügü anda bunu calistiracak
//Error kodun en altinda olmak zorunda.En son kisimda oldugunda calisiri
const Error_Handler = (err, req, res, next) => {
 console.error("Hata", err.message);

 const statusCode = res.errorStatusCode ?? 500;
 res.status(statusCode).json({
    error:true,
    message:err.message,
 })
}

app.use(Error_Handler);



app.listen(PORT, () => console.log('Running at www.localhost:' + PORT));