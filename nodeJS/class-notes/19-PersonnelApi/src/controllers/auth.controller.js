'use strict';

const Personnel = require('../models/personnel.model');
const { CustomError } = require('../utils');

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username || email) && password)
      throw new CustomError(
        'Username or email and password are required.',
        401
      );

    const user = await Personnel.findOne({
      $or: [{ username }, { email }],
      password,
    });

    if(!user) throw new CustomError('Username or email is not found.', 404);

    res.status(200).send({
      error: false,
      result: user,
    });

    if (!user) throw new CustomError('Username or email is not found.', 404);
  },
};
