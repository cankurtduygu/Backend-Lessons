'use strict';

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ?? 8000;
app.use(express.json());

const middlewareA = (req, res, next) => {
  console.log('midA calisti');
  req.user = 'Ali';
  // console.log(req)
  next();
};

const middlewareB = (req, res, next) => {
  console.log('middleware B worked');
  req.role = 'admin';
  if (req.user === 'Duygu') {
    req.role = 'admin';
  } else {
    req.role = 'user';
  }
  console.log(req);
  next();
};
// app.use(middlewareA, middlewareB);

app.use(middlewareA);
app.use(middlewareB);

app.get('/', (req, res) => {
  res.json({
    path: 'home',
    user: req.user,
    role: req.role,
  });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
