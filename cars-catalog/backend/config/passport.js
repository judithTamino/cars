const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField:"email"
    }, async (email, password, done) => {
        try {
            let localUser = await User.findOne({ email: email });
            if (localUser) {
                let matchPassword = await bcrypt.compare(password, localUser.password);
                if (matchPassword) {
                    // console.log('login successfully');
                    return done(null, localUser, { status: 200, msg: 'login successfully'})
                } else {
                    // console.log('password incorrect');
                    return done(null, false, { status: 400, msg: 'password incorrect'});
                }
            } else {
                // console.log('no user with that email');
                return done(null, false, { status: 404, msg: 'no user with that email'});
            }
        } catch (error) {
            console.log('hello')
            console.error(error);
        }
    }));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ["email", "name"]
    },
    async (accessToken, refreshToken, profile, done) => {
        const {email, first_name, last_name, id } = profile._json;
        const newUser = {
            firstName: first_name,
            lastName: last_name,
            email: email,
            signWith: 'facebook',
            facebookToken: accessToken
        }
        try {
            let user = await User.findOne({ email: email });
            if (user) {
                done(null, user);
                console.log('login successfully')
            } else {
                user = await User.create(newUser);
                console.log('user added');
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}