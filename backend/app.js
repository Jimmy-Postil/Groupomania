const express = require('express');

const app = express();


//Appel des différents models de la base de données
const db = require("./models")
db.sequelize.sync();

module.exports = app;