'use strict';

//MODELS
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI,
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
); 

//MODEL (todo)
const Todo = sequelize.define('todos', {

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

//connect to db
sequelize
  .authenticate()
  .then(() => console.log('*DB CONNECTED*'))
  .catch((error) => console.log('DB NOT CONNECTED', error));