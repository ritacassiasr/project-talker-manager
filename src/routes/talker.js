const express = require('express');
const path = require('path');
const { readFile, writeData } = require('../utils');
const { tokenValidate, nameValidate, 
    ageValidate,
    rateValidate, 
    talkValidate, 
    WatchedAtValidate } = require('../middlewares/validates');

const routeTalker = express.Router();
const pathData = path.resolve('src', 'talker.json');

routeTalker.get('/', async (_req, res) => {
    const result = await readFile(pathData);
    if (result.length === 0) {
        return res.status(200).json([]);
    }
    return res.status(200).json(result);    
});

routeTalker.get('/search', tokenValidate, async (req, res) => {
  const { q } = req.query;
  console.log(q);

  const result = await readFile(pathData);

  if (q === '') return res.status(200).json(result);
  if (!q) return res.status(200).json([]); 
    
  const resultTalker = result
    .filter((talk) => talk.name.toLowerCase().includes(q.toLocaleLowerCase()));
    
    return res.status(200).json(resultTalker);
});

routeTalker.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await readFile(pathData);
    const speaker = result.find((q) => q.id === Number(id));
    if (!speaker) { 
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(speaker);   
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
    const data = await readFile(pathData);
    speaker.id = data.length + 1;
    data.push(speaker);
    await writeData(data, pathData);

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
  const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;

    const talker = await readFile(pathData);
    
    const oneTalker = talker.find((e) => e.id === +id);

    oneTalker.name = name;
    oneTalker.age = age;
    oneTalker.talk.watchedAt = watchedAt;
    oneTalker.talk.rate = rate;

    const allTalker = talker.filter((e) => e.id !== +id);
  
   await writeData([...allTalker, oneTalker], pathData); 

     res.status(200).json(oneTalker);
});

  routeTalker.delete('/:id', tokenValidate, async (req, res) => {
    const { id } = req.params;
    const data = await readFile(pathData);

    const deleteId = data.filter((q) => q.id !== Number(id)); 

    await writeData(deleteId, pathData);
    return res.status(204).json();
  });

module.exports = routeTalker;   