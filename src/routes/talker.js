const express = require('express');
const path = require('path');
const { readFile, writeData } = require('../utils');
const { nameValidate, 
    ageValidate, 
    tokenValidate, 
    rateValidate, 
    talkValidate, 
    WatchedAtValidate } = require('../middlewares/validates');

const routeTalker = express.Router();
const pather = path.resolve('src', 'talker.json');

routeTalker.get('/', async (_req, res) => {
    const result = await readFile(pather);
    if (result.length === 0) {
        return res.status(200).json([]);
    }
    return res.status(200).json(result);    
});

routeTalker.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await readFile(pather);
    const speaker = result.find((q) => q.id === Number(id));
    if (!speaker) { 
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(202).json(speaker);   
});

routeTalker.post('/', 
nameValidate, 
ageValidate, 
tokenValidate, 
rateValidate,
talkValidate,
WatchedAtValidate,
async (req, res) => {
    const speaker = req.body;
    const data = await readFile(pather);
    speaker.id = data.length + 1;
    data.push(speaker);
    await writeData(data, pather);

    return res.status(201).json(speaker);
  });

module.exports = routeTalker;   