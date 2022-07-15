require('dotenv').config();
const express = require('express');
const app = express();
// Import Routes
const signsRoutes = require('./routes/signs');
const elementsRoutes = require('./routes/elements');

// Définition du headers pour CORS.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    next();
});
app.use(express.json());

// Routes
app.use('/api/signs/', signsRoutes);
app.use('/api/elements/', elementsRoutes);

module.exports = app;
