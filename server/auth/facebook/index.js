'use strict';
var express = require('express');
var passport = require('passport');
var router = express.Router();

router
    .get('/', passport.authenticate('facebook', {
        scope: ["email", "public_profile"],
        failureRedirect: '/'
    }))

    .get('/callback', passport.authenticate('facebook', {
        successRedirect: '/#/verify',
        failureRedirect: '/'
    }));

module.exports = router;
