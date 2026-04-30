'use strict';
/*---------------------------------*/
/*Express - Todo*/
/*--------------------------------*/

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8001;

/* --------------------------------------*/
//MIDDLEWARES

//accept json

//MODELS
const { Sequelize, DataTypes } = require('sequelize');

// sequelize instance
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
const sequelize = new Sequelize(process.env.DB_URI,
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
); // Example for postgres( burda Sequelize claasindan bir instance oluturduk)

//MODEL (todo)
const Todo = sequelize.define('todos', {
  // id field created by sequelize
  //   id: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false, // default: true
  //     unique: true, // default: false
  //     comment: "description",
  //     primaryKey: true, // default: false
  //     autoIncrement: true, // default: false
  //     field: "todo_id",
  //     defaultValue: 100, // default: null
  //   },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: DataTypes.TEXT, // shorthand usage.

  priority: {
    // -1: Low, 0: normal, 1: high
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  // not needed define createdAt and updatedAt fields. Cause they are created by sequelize.
});

//Syncronization:Sadece bir kere calistirip sonra bunu yoruma aliyoruz
// sequelize.sync()

//connect to db
sequelize
  .authenticate()
  .then(() => console.log('*DB CONNECTED*'))
  .catch((error) => console.log('DB NOT CONNECTED', error));

// try {
//   await sequelize.authenticate();
//   console.log('* DB CONNECTED');
// } catch (error) {
//   console.error('db not:', error);
// }

/* --------------------------------------*/
//ROUTES
app.use(express.json());

// app.all('/', (req, res) => {
//   res.send('Welcome to todo api');
// });

// LIST TODOS:
//db ye yapilan tüm istekler async dir.benim todos tablosundaki herseyi getirmek istiyorum diecegiz. Burda model kullanmmaiz lazim. Bizim modelimiz todo

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
/*---------------------------------*/
/* ----------------------------------------------------- */
// TODO: handle not found routes

// READ TODO:
app.get('/:id', async (req, res) => {
  //   const todo = await Todo.findOne({where: {id: req.params.id}});
  //   const todo = await Todo.findOne({ where: { title: req.params.id } });
  const todo = await Todo.findByPk(req.params.id); //sequelize bu kosul ile bize findOne olayini kolaylastiriyor.

  res.status(200).send({
    error: false,
    data: todo,
  });
});

// todo: update and delete controllers
// UPDATE TODO:
app.put("/:id", async(req,res) => {

  //Destructuring yapmis olduk.
  const [isUpdated] = await Todo.update(req.body, {where: {id:req.params.id}}); 

  if(!isUpdated){
    res.errStatusCode = 400;
    throw new Error ('data is not updated. Something went wrong.')
  }

  res.status(202).send({
    error: false,
    new: await Todo.findByPk(req.params.id)
  });
})

//DELETE TODO
app.delete("/:id", async(req,res) => {
  //destroy ({.....})

  const isDeleted = await Todo.destroy({where: {id:req.params.id}}); 

  if(!isDeleted){
    res.errStatusCode = 400;
    throw new Error ('data is not deleted or deleted already')
  }

  res.sendStatus(204);
})

/* ----------------------------------------------------- */
// TODO: handle not found routes

// NOT FOUND ROUTE:
app.all("/*splat", (req, res) => {
  // res.status(404).send({
  //   error: true,
  //   message: 'Route is not found'
  // })
  res.errStatusCode = 404;
  throw new Error("Route is not found");
});

// ERROR HANDLER:
const errorHandler = (err, req, res, next) => {

  const statusCode = res.errStatusCode ?? 500
  res.status(statusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
    stack: err.stack,
  });
};




app.use(errorHandler);

/*--------------------------------*/
app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));
