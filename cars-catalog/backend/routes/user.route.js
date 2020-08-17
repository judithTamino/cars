// import express from "express";
// import passport from "passport";
const express = require('express');
const passport = require('passport');
const router = express.Router();


//? @desc Auth with Facebook
//? @route GET /auth/facebook
router.route('/facebook').get(passport.authenticate('facebook'));
// router.get("/facebook", passport.authenticate("facebook"));

//? @desc Facebook auth callback
//? @route GET /auth/facebook/callback
// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/dashboard");
//   }
// );
