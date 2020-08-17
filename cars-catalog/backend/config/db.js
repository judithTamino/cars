const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('MongoDB database connection established successfully');
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

module.exports = connectDB;