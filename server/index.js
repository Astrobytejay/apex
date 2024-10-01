const express = require('express');
const db = require('./db/config');
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 5001; // Use PORT from environment if available

// Setup Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.use('/api', route);

app.get('/', (req, res) => {
    res.send('Welcome to my world...');
});

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
const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});
