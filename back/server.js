require("dotenv").config();
const http = require('http');
const app = require('./app');

const mongoose = require('mongoose');
const DB_MONGODB = process.env.DB_MONGODB;
const MY_HOST = process.env.HOST;
const MY_PORT = process.env.PORT;

app.set('port', MY_PORT);
const server = http.createServer(app);

// Démarrage du serveur.
server.on('error', (err) => {
    console.log(`[ERROR] Server Error | ${err}`);
});
// Serveur en ligne.
server.listen(MY_PORT, MY_HOST, () => {
    console.log(`[INFO] Server running on http://${MY_HOST}:${MY_PORT}`);
    console.log(`[INFO] Connection to MongoDB...`);
    mongoose.connect(DB_MONGODB,
        {useNewUrlParser : true,
        useUnifiedTopology : true})
    .then( () => {
        console.log(`[SUCCESS] MongoDB connected.`);
    })
    .catch( () => {
        console.log('[ERROR] MongoDB connection failed!');
    });
});
