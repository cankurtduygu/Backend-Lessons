'use strict';
/* -------------------------------------------------------
            EXPRESSJS - TODO CONTROLLER
------------------------------------------------------- */

const Todo = require('../models/todoModel');

const PRIORITIES = {
  '-1': 'Low',
  0: 'Normal',
  1: 'High',
};

module.exports = {
  list: async (req, res) => {
    const todos = await Todo.findAndCountAll();
    res.render('index', {
      count: todos.count,
      todos: todos.rows,
      priorities: PRIORITIES,
    });
  },

  create: async (req, res) => {
    if (req.method === 'POST') {
      const todos = await Todo.create(req.body);

      res.redirect('/view');
    } else {
      res.render('todoCreate', { priorities: PRIORITIES });
    }
  },

  read: async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);

    res.render('todoRead', { todo, priorities: PRIORITIES });
  },

  update: async (req, res) => {
    if (req.method === 'POST') {
      const [isUpdated] = await Todo.update(req.body, {
        where: { id: req.params.id },
      });

      res.redirect('/view');
    } else {
      const todo = await Todo.findByPk(req.params.id);
      res.render('todoUpdate', { todo, priorities: PRIORITIES });
    }
  },

  delete: async (req, res) => {
    const isDeleted = await Todo.destroy({
      where: { id: req.params.id },
    });

    if (isDeleted) {
      res.redirect('/view');
    } else {
      res.errStatusCode = 400;
      throw new Error('Data already deleted or something went wrong.');
    }
  },

  toggle: async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      res.errStatusCode = 404;
      throw new Error('Todo not found.');
    }

    const [isUpdated] = await Todo.update(
      { isDone: !todo.isDone },
      { where: { id: req.params.id } }
    );

    if (!isUpdated) {
      res.errStatusCode = 400;
      throw new Error('Data is not updated. Something went wrong.');
    }

    const updatedTodo = await Todo.findByPk(req.params.id);
    res.status(202).json({ error: false, data: updatedTodo });
  },
};
