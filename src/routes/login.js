const express = require('express');
const { generateToken } = require('../utils');
const validateLogin = require('../middlewares/validateLogin');

const routeLogin = express.Router();

routeLogin.post('/', validateLogin, async (_req, res) => {
    const token = generateToken();
    return res.status(200).json({ token });
      });

module.exports = routeLogin;