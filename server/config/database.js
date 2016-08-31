//DATABASE CONNECTION SETTINGS

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/thirstee');
