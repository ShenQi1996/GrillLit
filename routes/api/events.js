const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Event = require('../../models/Event');
const validateEventInput = require('../../validations/events');


router.get('/', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(events => res.json(events))    
        .catch(err => res.status(404).json({ noeventsfound: 'No events found'}));
});

router.get('/user/:user_id', (req, res) => {
    Event.find({ user: req.params.user_id })
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err => 
            res.status(404).json({ noeventsfound: 'No events were found of that user' }));
});

router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => 
            res.status(404).json({ noeventfound: 'No event found with that ID' }))
});
//Make sure event route is correct
router.put('/event/:eventId', (req, res) => {
    const event = Event.findById(req.params.eventId)

    if(!event) return rest.status(404).json({})
    event.userId = req.body.userId
    event.invites = req.body.invites
    event.title = req.body.title 
    event.description = req.body.description 
    event.location = req.body.location 
    event.longitude = req.body.longitude 
    event.latitude = req.body.latitude 
    event.date = req.body.date
    event.items = req.body.items

    res.json(event)
});

//Make sure event route is correct
router.post('/event', (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);
    
    if (!isValid){
        return res.status(400).json(errors);
    }

    const newEvent = new Event({
        userId: req.body.userId,
        invites: req.body.invites,
        title:  req.body.title,
        description: req.body.description,
        location: req.body.location,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        date: req.body.date,
        items: req.body.items
    })
    // newEvent.date = Date.now();
    if (newEvent.save()){
        res.json(newEvent)
    } else {
        return res.status(400).json({ eventDidNotSave: "Event did not saved successfully" })
    }
    
});

//Make sure event route is correct


router.delete('/event/:eventId', (req, res) => {

    const event_id = req.params.eventId;

    if( !Event.event_id ){
        return res.status(400).json({ eventNotFound: "Event doesn't exist"})
    }

    const event = Event.remove({ id: event_id })

    // Event.findByIdAndRemove(req.params.eventId, function(err){
    //     if(err){
    //         res.redirect('/index')
    //     } else {
    //         res.redirect('/index')
    //     }
    // })
});



module.exports = router;
