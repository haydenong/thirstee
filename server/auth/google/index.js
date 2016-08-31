'use strict';
var express = require('express');
var passport = require('passport');
var router = express.Router();

router
    .get('/', passport.authenticate('google', {
        failureRedirect: '/',
        scope: ["email", "profile"]
    }))

    .get('/callback', passport.authenticate('google', {
        successRedirect: '/#/verify',
        failureRedirect: '/'
    }));

module.exports = router;
