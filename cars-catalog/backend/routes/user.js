const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { ensureAuth, ensureGuest } = require('../middleware/auth');
const bcrypt = require('bcrypt'); 

router.post('/', async (req, res) => {
    const user = req.body;
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            signWith: 'local',
            password: hashedPassword
        });
        newUser.save()
        .then(() => res.sendStatus(201))
        .catch((err) => res.status(404).json(`Error: ${err}`))
    } catch (error) {
        res.status(404).json(`Error: ${error}`);
    }
});

module.exports = router;