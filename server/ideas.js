const express = require('express');
const { base } = require('mocha/lib/reporters/index.js');
const ideasRouter = express.Router();
const morgan = require('morgan');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

const { 
    getAllFromDatabase, 
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');

ideasRouter.use(morgan('tiny'));

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    let idea = getFromDatabaseById('ideas', ideaId);
    if (idea === undefined) {
        res.status(404).send('idea did not found')
    } else {
        req.idea = idea;
        req.ideaId = ideaId;
        next();
    }
})

ideasRouter.get('/', (req, res, next) => {
    let allIdeas = getAllFromDatabase('ideas');
    res.status(200).send(allIdeas);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    let newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea === null){
        res.status(400).send('bad request')
    } else {
        res.status(200).send(updatedIdea);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    let isDeleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if (isDeleted === true) {
        res.status(204).send();
    } else {
        res.status(404).send('bad request');
    }
});


module.exports = ideasRouter;