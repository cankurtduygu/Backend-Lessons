"use strict";
/*---------------------------------*/
/*Express - Todo Router*/
/*--------------------------------*/
const router
app.get('/', async (req, res) => {
  // const todos = await Todo.findAll();//bütün todolari cekmek istedigimiz icin findAll yapiyoruz.Deiskene atadikki bunu kullanabilelim dunc async oldugu icin await koymamiz gerekiyor.

  const todos = await Todo.findAndCountAll(); // Bir obje icerisinde count ve rows var.

  res.status(200).send({
    error: false,
    data: todos,
  });
});

// CREATE TODO:
app.post('/', async (req, res) => {
  // const todos = await Todo.create({
  //     title: 'todo-1'
  // });

  const todos = await Todo.create(req.body);

  res.status(201).send({
    error: false,
    data: todos,
  });
});