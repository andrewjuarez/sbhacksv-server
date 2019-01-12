var mongoose = require("mongoose");

// SChool schema
var schoolSchema = new mongoose.Schema({
    abreviation: String,
    name: String,
    address: String,
    lat: String,
    long: String
});

// School model
module.exports = mongoose.model("School", schoolSchema);