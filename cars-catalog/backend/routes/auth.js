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

// @desc logout user
// @route GET /auth/logout


module.exports = router;
