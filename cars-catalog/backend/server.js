const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const passport = require('passport');
const session = require('express-session');

const connectDB = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());

// load config file
dotenv.config({ path: './config/config.env' });

// passport config
require('./config/passport')(passport);

// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
const carsRouter = require('./routes/cars');
app.use('/auth', require('./routes/auth'));
app.use('/cars', carsRouter);

const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});