'use strict';
const express = require('express');
const app = express();
const router = express.Router();
app.use(router);
const students = [
  {
    id: 1,
    name: 'Alex',
  },
  {
    id: 2,
    name: 'Steve',
  },
];

router.get("/students", (req, res) => {
  res.json(students);
});
