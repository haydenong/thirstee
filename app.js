var express = require("express");
var app = express();
var passport = require("passport");
var bodyParser = require("body-parser");
var session = require("express-session");
// var morgan = require("morgan");
// app.use(morgan('dev'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DATABASE
require('./server/config/database');

//ROUTES
require('./server/api/routes')(app);
require('./server/auth')(app);

//STATIC DIRECTORY & PORT
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));
app.use(function (req, res) {
    console.info("FILE NOT FOUND IN PUBLIC: %s", req.originalUrl);
    res.redirect("/error.html");
});
var port = process.argv[2] || 3000;
app.set("port", port);
app.listen(app.get("port"), function () {
    console.info("Web server started on port %d", app.get("port"));
});


