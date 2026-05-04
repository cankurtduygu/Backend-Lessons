"use strict";
/*
    EXPRESSJS - BLOG Project with Mongoose
*/

// call models
const { Category } = require("../models/blogModel");

module.exports = {

    // LIST
    list: async (req, res) => {
        const data = await Category.find();

        res.status(200).send({
            error: false,
            result: data
        });
    },

    // // CREATE
    // create: async (req, res) => {
    //     const data = await Category.create(req.body);
    //     res.status(201).send(data);
    // },

    // // READ (tek kayıt)
    // read: async (req, res) => {
    //     const data = await Category.findById(req.params.id);
    //     res.status(200).send(data);
    // },

    // // UPDATE
    // update: async (req, res) => {
    //     const data = await Category.findByIdAndUpdate(
    //         req.params.id,
    //         req.body,
    //         { new: true, runValidators: true }
    //     );
    //     res.status(200).send(data);
    // },

    // // DELETE
    // delete: async (req, res) => {
    //     await Category.findByIdAndDelete(req.params.id);
    //     res.status(204).send();
    // }

};