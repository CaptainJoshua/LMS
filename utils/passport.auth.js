const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(
    new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        },
        async(username, password, done) => {
            try {
                const user = await User.findOne({ username });
                // Username does NOT exist
                if (!user) {
                    return done(null, false, {
                        message: 'Username not registered',
                    });
                }
                // Username exist and now we need to verify the password
                const isMatch = await user.isValidPassword(password);
                return isMatch ?
                    done(null, user) :
                    done(null, false, { message: 'Incorrect password' });
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});