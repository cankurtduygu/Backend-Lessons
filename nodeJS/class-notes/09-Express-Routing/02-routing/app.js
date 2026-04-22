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
})

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

//* Birden fazla param kullanımı

app.get('/urunler/:kategori/:id', (req, res) => {
  console.log('Params: ', req.params);
  res.json(req.params);
});



//! REGEX kullanımı
//Sadece rakam kabul eden param
app.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  if (!/^\d+$/.test(userId)) {
    return res.status(400).json({ hata: 'id sayı olmak zorunda' });
  }
  res.json({ userId });
});


// Başlayanlar

app.get(/^\/profile/, (req, res) => {
  res.json({ mesaj: 'profile ile başlayanlar' });
});

// Bitenler

app.get(/list$/, (req, res) => {
  res.json({ mesaj: 'list ile bitenler' });
});



// Filtreleme

app.get('/ara', (req, res) => {
  console.log('Query:', req.query);
  let sonuc = [...urunler];

  // kategori filtresi
  if (req.query.kategori) {
    sonuc = sonuc.filter(u => u.kategori === req.query.kategori);
  }

  // Fiyat filtresi
  if (req.query.maxFiyat) {
    sonuc = sonuc.filter(u => u.fiyat <= Number(req.query.maxFiyat)); //! query string döndürecektir sayı amaçlı kullanım için döndürmek gerekir
  }
  res.json(sonuc);
});

// Yeni Ürün Ekleme POST
app.post('/urunler', (req, res) => {
  console.log('body:', req.body);
  const { isim, fiyat, kategori } = req.body;

  //basit validasyon
  if (!isim || !fiyat || !kategori) {
    return res.status(400).json({ hata: 'Eksik bilgi' });
  }

  const yeniUrun = {
    id: urunler.length + 1,
    isim,
    fiyat,
    kategori,
  };
  urunler.push(yeniUrun);
  res.status(201).json({ mesaj: 'Ürün eklendi', urun: yeniUrun });
});

// Bilgi güncelleme PUT

app.put('/urunler/:id', (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const index = urunler.findIndex(u => u.id === id);

  //validansyon
  if (index === -1) {
    return res.status(404).json({ hata: 'Ürün bulunamadı' });
  }

  urunler[index] = { ...urunler[index], ...req.body };

  res.json({ mesaj: 'Ürün güncellendi', urun: urunler[index] });
});

// Ürün silme DELETE

app.delete('/urunler/:id', (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const index = urunler.findIndex(u => u.id === id);

  //validansyon
  if (index === -1) {
    return res.status(404).json({ hata: 'Ürün bulunamadı' });
  }

  const silinenUrun = urunler.splice(index, 1);

  res.json({ mesaj: 'Ürün silindi', urun: silinenUrun[0] });
});






app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});