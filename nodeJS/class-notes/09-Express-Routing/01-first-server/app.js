const express = require('express');
const app = express();

//dotenv -- .env dosyasini oku, process.env ile yükle
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME;

//* JSON bodyleri okuyabilmek icin gerekli:
app.use(express.json());


// Temel body'leri okuyabilmek icin gerekli
app.get('/', (req, res) => {
  res.json({ uygulama: APP_NAME, port: PORT });
});

app.get('/home', (req, res) => {
  res.json('Merhaba express');
});

app.put('/home', (req, res) => {
  res.send('Home put');
});

app.get('/users', (req, res) => {
  const users = [
    {id:1, isim:'Ahmet', yas:15},
    {id:2, isim:'Mehmet', yas:15},
    {id:3, isim:'Ali', yas:15},
  ];
  res.json(users);
});

app.get('/status', (req, res) => {
    // Status + JSON birlitke
  res.status(200).json({mesaj:'hersey yolunda'})
});

//Route ile zincir kullanimi
app
  .route('/products')
  .get((req, res) => res.json({ method: 'GET - liste' }))
  .post((req, res) => res.json({ method: 'POST - ekle' }))
  .put((req, res) => res.json({ method: 'PUT - güncelle' }))
  .delete((req, res) => res.json({ method: 'DELETE - sil' }));



app.listen(PORT, () => {
  console.log(`Sunucu calisiyor:http//localhost:${PORT}`);
});
