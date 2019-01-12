//Server variables
const port = process.env.PORT || 3000;


// Dependencies
var express        = require("express"),
    bodyParser     = require("body-parser"),
    mongoose       = require('mongoose'),
    methodOverride = require("method-override");


// Define app and set associations
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(indexRoutes);
app.use(dogRoutes);

app.listen(port, function(){
    console.log("Lost Paws server started on :" + port);
});