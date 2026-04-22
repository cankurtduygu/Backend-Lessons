const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const users = [
  { id: 1, isim: 'Ayşe', email: 'ayse@test.com' },
  { id: 2, isim: 'Mehmet', email: 'mehmet@test.com' },
];

//? all users
app.get('/users', (req, res) => {
  res.json(users);
});

//? tek kullanici
app.get('/users/:id', (req, res) => {
  // console.log(req.params)
  const userId = Number(req.params.id);
  // console.log("id",userId);
  const sonuc = users.find((u) => u.id === userId);
  // console.log(sonuc);
  if (!sonuc) {
    return res.status(404).json({ Error: 'user not found' });
  }
  res.json(sonuc);
});

//?post user
app.post('/users', (req, res) => {
  // console.log('body', req.body);

  const { isim, email } = req.body;

  // validasyon
  if (!isim || !email) {
    return res.status(400).json({ Error: 'Missing information' });
  }
  const newUser = {
    id: users.length + 1,
    isim,
    email,
  };
  users.push(newUser);
  res.status(201).json({ message: 'A user has been created', user: newUser });
});

//?delete user

app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ Error: 'User not found' });
  }
  const deletedUser = users.splice(index, 1);

  res.json({ message: 'user deleted', user: deletedUser[0] });
});

app.listen(PORT, () => {
  console.log(`The server is running: http://localhost:${PORT}`);
});
