const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.log('Error connecting to MongoDB');
        console.error(error);
        process.exit(1);
    });
}

module.exports = dbConnect;