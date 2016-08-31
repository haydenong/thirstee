'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/auth');
var User = require('../api/user/user.model');

module.exports = function (app) {
// Passport Configuration
// require('./local/passport').setup(User, config);
    require('./facebook/passport').setup(User, config);
    require('./google/passport').setup(User, config);
    require('./auth.service')(app);

// router.use('/local', require('./local'));
    app.use('/auth/facebook', require('./facebook'));
    app.use('/auth/google', require('./google'));

};
