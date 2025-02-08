const express = require('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./config/db');
const cors = require('cors');

const cookieParser = require('cookie-parser'); //to make cookie available in req.cookie
app.use(cookieParser());

app.use(express.json());
app.use(cors());

// default route
app.get('/', (req, res) => {
    res.send('Welcome to the GoLocal API');
});

// routes
const golocalRoutes = require('./routes/user.route');

// mounting the routes
app.use('/api/v1', golocalRoutes);

dbConnect();
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});