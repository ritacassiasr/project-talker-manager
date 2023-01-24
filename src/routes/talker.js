const express = require('express');
const path = require('path');
const readFile = require('../utils/readFile');

const routeTalker = express.Router();
const pather = path.resolve('src', 'talker.json');

routeTalker.get('/', async (req, res) => {
    const result = await readFile(pather);
    if (result.length === 0) {
        return res.status(200).json([]);
    }
    return res.status(200).json(result);    
});

module.exports = routeTalker;