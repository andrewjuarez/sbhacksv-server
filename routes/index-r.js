var express = require("express");
var router = express.Router();

const twilioAuth = require("../private/twilioAuth");
const twilioClient = require("twilio")(twilioAuth[0], twilioAuth[1]);
const twilioNumber = require("../private/twilioNumber");

router.post("/textMe", function(req, res){
    console.log("Attempting to text from Twilio.");
    twilioClient.messages.create({
        body: "Hi Andrew!",
        from: twilioNumber,
        to: "+15623193696"
    })
    .then(message => console.log(message.sid))
    .done(console.log("Message sent completed!"));
    res.send("Text should go through!");
});

 module.exports = router;