const express = require('express');
const path = require('path');
const { readFile, writeData } = require('../utils');
const { tokenValidate, nameValidate, 
    ageValidate,
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
    return res.status(200).json(speaker);   
});

routeTalker.get('/search',
 tokenValidate, 
 async (req, res) => {
    const talker = await readFile(path);
    const { q } = req.query;

    const resultTalker = talker
    .filter((talk) => talk.name.toLowerCase().includes(q.toLocaleLowerCase()));

    return res.status(200).json(resultTalker);
});

routeTalker.post('/', 
tokenValidate,
talkValidate,
nameValidate, 
ageValidate,  
rateValidate,
WatchedAtValidate,
async (req, res) => {
    const speaker = req.body;
    const data = await readFile(pather);
    speaker.id = data.length + 1;
    data.push(speaker);
    await writeData(data, pather);

    return res.status(201).json(speaker);
  });

routeTalker.put('/:id', 
tokenValidate,
talkValidate,
nameValidate, 
ageValidate,  
rateValidate,
WatchedAtValidate,
async (req, res) => {
    let speaker = req.body;
    const { id } = req.params;    
    const data = await readFile(pather);

    const setSpeaker = data.find((q) => {
        if (q.id === Number(id)) { return { id: Number(id), ...speaker }; } 
        return q;
    });

    speaker = { id: Number(id), ...speaker };

    await writeData(setSpeaker, pather);
    return res.status(201).json(speaker);
  });

  routeTalker.delete('/:id', tokenValidate, async (req, res) => {
    const { id } = req.params;
    const data = await readFile(pather);

    const deleteId = data.filter((q) => q.id !== Number(id)); 

    await writeData(deleteId, pather);
    return res.status(204).json();
  });

module.exports = routeTalker;   