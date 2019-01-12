// Manually run this file to a school to the school collection

var mongoose = require("mongoose");
const mongoURL = require("./private/mongo"); // Keep the connection URL hidden from GitHub.
var request   = require("request");


// connect mongoose client to DB
mongoose.connect(mongoURL, {useNewUrlParser: true});

School = require("./models/school");

var schoolAddress = "Bus LoopIrvine, CA 92697";

var mapsRequestURI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(schoolAddress) + "&key=" + require("./private/googleapikey");

var lat, long;
request(mapsRequestURI,{ json :true}, function(err, apiRes, body){
    if(!err && apiRes.statusCode == 200){
        lat = apiRes.body["results"][0]["geometry"]["location"]["lat"];
        long = apiRes.body["results"][0]["geometry"]["location"]["lng"];
        console.log(lat, long);

        var newSchool = {
            abreviation: "UCI",
            name: "University of California, Irvine",
            address: schoolAddress,
            lat: lat,
            long: long
        };
    
        // Add the school to the DB
        console.log("Adding School " + newSchool);
        School.create(newSchool, function(err1, school){
            if(err1) {
                console.log("Error: Unable to add School to DB");
                
            } else {
                console.log("Successfully added school to DB.");
                
            }
        });

    } else {
        console.log(err);
    }
});
