var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    email: String
});

module.exports = mongoose.model("User",  UserSchema);