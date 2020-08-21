const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc auth with facebook
// @route GET /auth/facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))

// @desc facebook auth callback
// @route GET /auth/facebook/callback
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
(req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.FRONTEND_HOST}/dashboard`);
});

// @desc auth with local 
// @route GET /auth/signin
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        let data = user;
        if (err) {
            data = info;
        }
        if (!user) {
            data = info;
        }
        req.logIn(user, function(err) {
            if (err) {
                data = info;
            }
            res.status(200).json(data);
        });
    })(req, res, next);
})

// @desc logout user
// @route GET /auth/logout
router.get('/logout', (res, req) => {
    req.logout();
    console.log('logout');
})


module.exports = router;
