const express = require('express');
const db = require('./db/config');
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 5001; // Make sure Render assigns the correct port

// Setup Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://eagleeyecrm.onrender.com', // Replace with your actual frontend URL on Render
    credentials: true
}));

// API Routes
app.use('/api', route);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../Client/build')));

// Route all other requests to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/build', 'index.html'));
});

// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
const DATABASE = process.env.DB || 'Prolink';
db(DATABASE_URL, DATABASE);

// Start the server
app.listen(port, '0.0.0.0', () => {
    const protocol = (process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    console.log(`Server listening at ${protocol}://0.0.0.0:${port}/`);
});
