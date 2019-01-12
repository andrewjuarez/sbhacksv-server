var express   = require("express"),
    mongooose = require("mongoose"),
    Event     = require("../models/event"),
    request   = require("request");

var router = express.Router();


// Display all events associated with school
router.post("/events", function(req, res){
    var school = req.body.school;
    if(!school){
        console.log("School not specified.")
        res.send({});
    } else {
        Event.find({"school" : school}, function(err, events){
            if(err){
                console.log("Error retrieving events: " + err);
                res.send({}); // Send an empty obj.
            } else {
                
                res.send(events);
            }
        });
    }
});


router.post("/event", function(req, res){
    var mapsRequestURI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(req.body.location) + "&key=" + require("../private/googleapikey");

    var lat, long;
    request(mapsRequestURI,{ json :true}, function(err, apiRes, body){
        if(!err && apiRes.statusCode == 200){
            lat = apiRes.body["results"][0]["geometry"]["location"]["lat"];
            long = apiRes.body["results"][0]["geometry"]["location"]["lng"];
            console.log(lat, long);

            const newEvent = {
                name        : req.body.name,
                location    : req.body.location,
                eventdate   : req.body.eventdate,
                description : req.body.description,
                school      : req.body.school.toLowerCase(),
                lat         : lat,
                long        : long,
                category    : req.body.category,
                userName    : req.body.userName
          };
      
          // Add the event to the DB
          console.log("Adding Event " + newEvent);
          Event.create(newEvent, function(err1, event){
              if(err1) {
                  console.log("Error: Unable to add Event to DB");
                  res.redirect("back");
              } else {
                  console.log("Successfully added event to DB.");
                  res.send("Post received!");
              }
          });

        } else {
            console.log(err);
        }
    });

    
    
    
});

 module.exports = router;