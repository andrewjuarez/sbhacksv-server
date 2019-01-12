var express = require("express"),
    User = require("../models/user");
var router = express.Router();

// Render landing page
router.post("/user", function(req, res){
    console.log(req.body);

    const newUser = {
          username : req.body.username,
          email    : req.body.email
    };

    var domainRegex = /(?<=@)[^.]+(?=\.)/;
    var domain = req.body.email.match(domainRegex);
    console.log("User is on domain: " + domain);

    // Add the user to the DB
    console.log("Adding User " + newUser);
    User.create(newUser, function(err, user){
        if(err) {
            console.log("Error: Unable to add user to DB");
            res.redirect("back");
        } else {
            console.log("Successfully added user to DB.");
            res.send("Post received!");
        }
    });
    
});

 module.exports = router;