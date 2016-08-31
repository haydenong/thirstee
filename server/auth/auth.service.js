var passport = require('passport');
var session = require("express-session");


module.exports =  function (app) {
    app.use(session({
        secret: "pukcats",
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        console.info("SERIALIZE");
        done(null, user)
    });

    passport.deserializeUser(function (user, done) {
        console.info("DESERIALISE" + JSON.stringify(user));
        done(null, user);
    });

    app.get("/api/user", function (req, res) {
        // console.info("USER" + JSON.stringify(req));
        console.info("NEWUSER" + JSON.stringify(req.user));
        res.send(req.user);
    });
};