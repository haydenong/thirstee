//ROUTES FOR THE APP
var express = require('express');


module.exports = function (app) {
    // Insert routes below
    app.use("/api/vendors", require("./vendor"));
    app.use("/api/users", require("./user"));
    app.use("/api/happyhour", require("./happyhour"));

};