"use strict";
/* -------------------------------------------------------
            EXPRESSJS - TODO ROUTER
------------------------------------------------------- */
// ROUTES:

const router = require("express").Router();
const todo = require("../controllers/todoController.view");


router.get('/', todo.list)

router.all('/create', todo.create)

router.get('/:id', todo.read)
router.all('/:id/update', todo.update)

router.get('/:id/delete', todo.delete)

router.patch("/:id/toggle", todo.toggle);

module.exports = router;
