const express = require('express');
const minionsRouter = express.Router();
const morgan = require('morgan');

const { getAllFromDatabase, addToDatabase } = require('./db.js');
minionsRouter.use(morgan('tiny'));

minionsRouter.get('/', (req, res, next) => {
    let allMinions = getAllFromDatabase('minions');
    res.status(200).send(allMinions);
});

minionsRouter.post('/', (req, res, next) => {
    let newMinion = addToDatabase('minions', req.body);
    console.log(newMinion);
    res.status(201).send(newMinion);
});

module.exports = minionsRouter;