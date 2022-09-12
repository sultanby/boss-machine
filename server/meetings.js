const express = require('express');
const { base } = require('mocha/lib/reporters/index.js');
const meetingsRouter = express.Router();
const morgan = require('morgan');

const { 
    getAllFromDatabase, 
    createMeeting, 
    addToDatabase,
    deleteAllFromDatabase
} = require('./db.js');

meetingsRouter.use(morgan('tiny'));

meetingsRouter.get('/', (req, res, next) => {
    let allMeetings = getAllFromDatabase('meetings');
    res.status(200).send(allMeetings);
});

meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();

});


module.exports = meetingsRouter;