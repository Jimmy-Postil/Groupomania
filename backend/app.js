const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post')

//Appel des différents models de la base de données
const db = require("./models")
db.sequelize.sync();

//Initialisation des headers pour éviter les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

//Sécurisation de l'application en ajoutant diverses en-têtes http
app.use(helmet());

//Enregistrement des routeurs
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes)

module.exports = app;