var express = require("express");
var router = express.Router();

const twilioAuth = require("../private/twilioAuth");
const twilioClient = require("twilio")(twilioAuth[0], twilioAuth[1]);
const twilioNumber = require("../private/twilioNumber");

// Send a text message
router.post("/sms", function(req, res){
    console.log("Attempting to text from Twilio.");
    twilioClient.messages.create({
        body: req.body.message,
        from: twilioNumber,
        to: req.body.number
    })
    .then(message => console.log(message.sid))
    .done(console.log("Message sent completed!"));
    res.send("Text should go through!");
});

 module.exports = router;