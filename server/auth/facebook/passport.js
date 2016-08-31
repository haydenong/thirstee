var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, config) {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: config.facebook.profileFields
        },
        function (accessToken, refreshToken, profile, done) {
            console.info("RETRIEVED PROFILE"+profile);
            console.info("RETRIEVED PROFILE"+JSON.stringify(profile));
            User.findOne({
                'facebook.id': profile.id
            }, function (err, user) {
                if (!user) {
                    var newUser = new User();
                    newUser.name.first = profile.name.givenName;
                    newUser.name.last = profile.name.familyName;
                    newUser.email = profile.emails[0].value;
                    newUser.profile_pic_url = profile.photos[0].value;
                    newUser.gender = profile.gender;
                    newUser.facebook.id = profile.id;
                    newUser.created_at = new Date();
                    newUser.updated_at = new Date();
                    newUser.save(function (err) {
                        if (err) return done(err);
                        done(err, user);
                    });
                } else {
                    console.info("REACHED HERE");
                    return done(err, user);
                }
            });
        }));

};

