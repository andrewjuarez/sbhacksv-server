var express   = require("express"),
    mongooose = require("mongoose"),
    Event     = require("../models/event"),
    request   = require("request");

var router = express.Router();

var EventSortAlg = require("../private/compareEventByTime");

// Display all events associated with school
router.post("/events", function(req, res){
    var school = req.body.school;
    var category = req.body.category;
    console.log("School: ", school);
    console.log("category: ", category);
    if(!school){
        console.log("School not specified.")
        res.send({});
    } else {
        if(!!category && category != "all") {
            Event.find({"school" : school, "category" : category}, function(err, events){
                if(err){
                    console.log("Error retrieving events: " + err);
                    res.send({}); // Send an empty obj.
                } else {
                    console.log("Please let me get all the events for " + school);
                    events = require("../private/removePassedEvents")(events);
                    events.sort(EventSortAlg);
                    res.send(events);
                }
            });
        } else {
            Event.find({"school" : school}, function(err, events){
                if(err){
                    console.log("Error retrieving events: " + err);
                    res.send({}); // Send an empty obj.
                } else {
                    console.log("Please let me get all the events for " + school);                    
                    events = require("../private/removePassedEvents")(events);
                    events.sort(EventSortAlg);
                    res.send(events);
                }
            });
        }
    }
});


router.post("/event", function(req, res){
    console.log("Attempting to post an event to DB");

    var mapsRequestURI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(req.body.location) + "&key=" + require("../private/googleapikey");

    var lat, long;
    request(mapsRequestURI,{ json :true}, function(err, apiRes, body){
        console.log(mapsRequestURI);
        console.log(apiRes.statusCode);
        

        if(err){
            console.log(err);
        }
        if(!err && apiRes.statusCode == 200){
            console.log("MAPS geolocation fetch success?");
            if(!apiRes.body["results"][0]){
                console.log("Hola");
                console.log(err);
                res.status(400).send({error: "Invalid Address"}); 
                return;
            } else {
            
                lat = apiRes.body["results"][0]["geometry"]["location"]["lat"];
                long = apiRes.body["results"][0]["geometry"]["location"]["lng"];
                console.log(lat, long);

                console.log(req.body.eventdatestart);
                console.log(req.body.eventdateend);

                const newEvent = {
                    name          : req.body.name,
                    location      : req.body.location,
                    description   : req.body.description,
                    school        : req.body.school.toLowerCase(),
                    lat           : lat,
                    long          : long,
                    category      : req.body.category,
                    userName      : req.body.userName,
                    eventdateend  : req.body.eventdateend,
                    eventdatestart: req.body.eventdatestart
            };
        
            // Add the event to the DB
            // console.log("Adding Event " + newEvent);
            Event.create(newEvent, function(err1, event){
                if(err1) {
                    console.log("Error: Unable to add Event to DB");
                    res.redirect("back");
                } else {
                    console.log("Successfully added event to DB.");
                    res.send("Post received!");
                }
            });

        }

        } else {
            console.log("Hello");
            console.log(err);
            res.status(400).send({error: "Invalid Address"}); 
        }
    });

    
    
    
});

 module.exports = router;