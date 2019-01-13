var mongoose = require("mongoose");

// Event schema
var eventSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    school: String,
    lat: String,
    long: String,
    category: String,
    userName  : String,
    eventdateend: String,
    eventdatestart: String
});

// event model
module.exports = mongoose.model("Event", eventSchema);