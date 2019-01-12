//Server variables
const port = process.env.PORT || 3090;


// Dependencies
var express        = require("express"),
    bodyParser     = require("body-parser"),
    mongoose       = require('mongoose'),
    methodOverride = require("method-override"),
    request        = require("request"),
    cors           = require("cors");
    
// Mongoose Client
const mongoURL = require("./private/mongo"); // Keep the connection URL hidden from GitHub.

// Define app and set associations
var app = express();
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Import Routes
var indexRoutes = require("./routes/index-r");
var eventRoutes = require("./routes/events");
var userRoutes  = require("./routes/user");

// connect mongoose client to DB
mongoose.connect(mongoURL, {useNewUrlParser: true});

// Import routes
app.use(indexRoutes);
app.use(eventRoutes);
app.use(userRoutes);

app.listen(port, function(){
    console.log("SB Hacks V server started on :" + port);
});