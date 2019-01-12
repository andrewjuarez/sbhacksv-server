var express = require("express"),
    mongooose = require("mongoose"),
    Event = require("../models/event");
var router = express.Router();


// Display all events associated with school
router.post("/events", function(req, res){
    var school = req.body.school;

    Event.find({"school" : school}, function(err, events){
        if(err){
            console.log("Error retrieving events");
            res.send("/GET Error with events");
        } else {
            
            events.forEach(function(event) {
                console.log("Event " + event["description"] );
            });
            res.send(events);
        }
    });
});


router.post("/event", function(req, res){
    console.log(req.body);


    const newEvent = {
          name        : req.body.name,
          location    : req.body.location,
          date        : req.body.date,
          description : req.body.description,
          school      : req.body.school
    };

    // Add the event to the DB
    console.log("Adding Event " + newEvent);
    Event.create(newEvent, function(err, event){
        if(err) {
            console.log("Error: Unable to add Event to DB");
            res.redirect("back");
        } else {
            console.log("Successfully added event to DB.");
            res.send("Post received!");
        }
    });
    
});

 module.exports = router;