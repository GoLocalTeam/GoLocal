const express = require('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./config/db');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// default route
app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

// routes
// const todoRoutes = require('./routes/todo');

// mounting the routes
// app.use('/api/v1', todoRoutes);

dbConnect();
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});