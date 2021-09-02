'use strict';

const fs = require('fs');
const path = require('path');
const { ForeignKeyConstraintError } = require('sequelize');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


db.User.hasMany(db.Post, { as: "Post" });
db.Post.belongsTo(db.User, {
  foreignKey: "userId",
  as: "Post",
});
db.User.hasMany(db.Commentaire, { as: "Commentaire" });
db.Commentaire.belongsTo(db.User, {
  foreignKey: "userId",
  as: "Commentaires",
});
db.Post.hasMany(db.Commentaire, { as: "Commentaire" });
db.Commentaire.belongsTo(db.Post, {
  foreignKey: "postId",
  as: "Post",
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
