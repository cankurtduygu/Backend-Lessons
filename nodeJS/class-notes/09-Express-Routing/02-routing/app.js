const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const urunler = [
  { id: 1, isim: 'Laptop', fiyat: 15000, kategori: 'elektronik' },
  { id: 2, isim: 'Telefon', fiyat: 8000, kategori: 'elektronik' },
  { id: 3, isim: 'Masa', fiyat: 3000, kategori: 'mobilya' },
  { id: 4, isim: 'Sandalye', fiyat: 500, kategori: 'mobilya' },
];

//* Tüm ürünler getir
app.get('/urunler', (req, res) => {
  res.json(urunler);
});

//* Tek ürün getir -- :id dinamik parametre
app.get('/urunler/:id', (req, res) => {
  console.log('Params: ', req.params);
  const id = Number(req.params.id); //! Gelen değer string olacaktır
  const urun = urunler.find(u => u.id === id);

  if (!urun) {
    return res.status(404).json({ hata: 'Ürün bulunamadı' });
  }

  res.json(urun);
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
