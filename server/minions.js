const express = require('express');
const { base } = require('mocha/lib/reporters/index.js');
const minionsRouter = express.Router();
const morgan = require('morgan');

const { 
    getAllFromDatabase, 
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');

minionsRouter.use(morgan('tiny'));

minionsRouter.param('minionId', (req, res, next, minionId) => {
    let minion = getFromDatabaseById('minions', minionId);
    if (minion === undefined) {
        res.status(404).send('minion did not found')
    } else {
        req.minion = minion;
        req.minionId = minionId;
        next();
    }
})

minionsRouter.get('/', (req, res, next) => {
    let allMinions = getAllFromDatabase('minions');
    res.status(200).send(allMinions);
});

minionsRouter.post('/', (req, res, next) => {
    let newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion === null){
        res.status(400).send('bad request')
    } else {
        res.status(200).send(updatedMinion);
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    let isDeleted = deleteFromDatabasebyId('minions', req.minionId);
    if (isDeleted === true) {
        res.status(204).send();
    } else {
        res.status(404).send('bad request');
    }
});

module.exports = minionsRouter;