const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../../models/Event");
const validateEventInput = require("../../validations/events");


router.get("/index", (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: "No events found" }));
});

router.get("/user/:user_id", (req, res) => {
  Event.find({ userId: req.params.user_id })
    .sort({ date: -1 })
    .then(events => res.json(events))
    .catch(err =>
      res
        .status(404)
        .json({ noeventsfound: "No events were found of that user" })
    );
});

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err =>
      res.status(404).json({ noeventfound: "No event found with that ID" })
    );
});

//Make sure event route is correct

router.put('/like:eventId', async (req, res )=> {
const resp = await Event.update(
  { }
)
})



router.patch("/event/:eventId", async (req, res) => {
  const invitesEdit = req.body.invites.split(" ");

  let newArr = [];

  invitesEdit.forEach(id_arr => {
    if (req.body.UserIdToRemove !== id_arr) {
      newArr.push(id_arr);
    }
  });
  let finalArr = newArr.join(" ");



  const resp = await Event.updateOne(
    { _id: req.params.eventId },
    {
      userId: req.body.userId,
      invites: finalArr,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      date: req.body.date,
      items: req.body.items,
      
      likes: req.body.likes
    }
  );
  res.json({ success: "updated event" });
});

// router.patch('/invite/:eventId', async(req, res) => {

//     const invitesEdit = req.body.invites.split(" ");

//     invitesEdit.forEach( id_arr => {

//         if(req.body.UserIdToChange === id_arr)

//         newEvent.set(`invites.${id_arr}`, false);
//     });

//Make sure event route is correct
router.post("/event", (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newEvent = new Event({
    userId: req.body.userId,
    invites: req.body.invites,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    date: req.body.date,
    items: req.body.items,
    likes: req.body.likes,
  });
  // const userIds = req.body.invites.split(" ");

  // userIds.forEach( id_arr => {
  //     newEvent.set(`invites.${id_arr}`, false);
  // });

  if (newEvent.save()) {
    res.json(newEvent);
  } else {
    return res
      .status(400)
      .json({ eventDidNotSave: "Event did not saved successfully" });
  }
});

//Make sure event route is correct

router.delete("/event/:eventId", (req, res) => {
  const event_found = Event.findById(req.params.eventId);

  if (!event_found) {
    return res.status(400).json({ eventNotFound: "Event doesn't exist" });
  } else {
    Event.findByIdAndRemove(req.params.eventId, function (err) {
      if (err) {
        res.json(err);
      } else {
        res.json({ eventId: `${req.params.eventId}` });
      }
    });
  }
});



module.exports = router;
