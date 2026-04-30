// console.log("MODEL DOSYASI CALISTI");

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:D.2027@localhost:5432/todo-self') 

sequelize
    .authenticate()
    .then(()=>console.log("* DB CONNECTED *"))
    .catch((error)=>console.log("! DB NOT CONNECTED", error));