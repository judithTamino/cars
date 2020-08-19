const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (passport) => {
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