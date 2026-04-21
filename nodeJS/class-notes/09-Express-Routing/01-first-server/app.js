const express = require('express');
const app = express();

//dotenv -- .env dosyasini oku, process.env ile yükle
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME;

//* JSON bodyleri okuyabilmek icin gerekli:
app.use(express.json());


app.get("/", (req, res) => {
    res.json({uygulama: APP_NAME, port: PORT})
})

app.listen(PORT, () => {
    console.log(`Sunucu calisiyor:http//localhost:${PORT}`);
})