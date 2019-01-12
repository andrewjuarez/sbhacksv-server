var express   = require("express"),
    mongooose = require("mongoose"),
    Event     = require("../models/event"),
    request   = require("request");

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
    // console.log(req.body);
    var mapsRequestURI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(req.body.location) + "&key=" + require("../private/googleapikey");

    // axios.get(mapsRequestURI)
    //   .then(function(response) {
    //         console.log("Please display! " + response.data);
    //         // console.log(response[results][geometry][location][lat]);
            
    //   })
    //   .catch(function(err) {
    //       console.log("Error" + err);
    //   }
    // );

    var lat, long;
    request(mapsRequestURI,{ json :true}, function(err, apiRes, body){
        if(!err && apiRes.statusCode == 200){
            lat = apiRes.body["results"][0]["geometry"]["location"]["lat"];
            long = apiRes.body["results"][0]["geometry"]["location"]["lng"];
            console.log(lat, long);

            const newEvent = {
                name        : req.body.name,
                location    : req.body.location,
                date        : req.body.date,
                description : req.body.description,
                school      : req.body.school,
                lat         : lat,
                long        : long
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