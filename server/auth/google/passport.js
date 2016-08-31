var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({
                'google.id': profile.id
            }, function (err, user) {
                if (!user) {
                    var newUser = new User();
                    newUser.name.first = profile.name.givenName;
                    newUser.name.last = profile.name.familyName;
                    newUser.email = profile.emails[0].value;
                    newUser.profile_pic_url = profile.photos[0].value;
                    newUser.gender = profile.gender;
                    newUser.google.id = profile.id;
                    newUser.created_at = new Date();
                    newUser.updated_at = new Date();
                    newUser.save(function (err) {
                        if (err) {
                            console.info("ERROR ENCOUNTERED WHIlE SAVING" + err);
                            return done(err);
                        }
                        console.info("REACHED HERE");
                        done(err, newUser);
                    });
                } else {
                    console.log("Found User -- Sending to serializer");
                    return done(err, user);
                }
            });
        }
    ));


};
