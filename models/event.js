var mongoose = require("mongoose");

// Event schema
var eventSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    school: String
});

// event model
module.exports = mongoose.model("Event", eventSchema);