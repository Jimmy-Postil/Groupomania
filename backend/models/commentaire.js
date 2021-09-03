
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Commentaire extends Model {

        static associate(models) {

            models.Commentaire.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'cascade',

            })
            models.Commentaire.belongsTo(models.Post, {
                foreignKey: 'postId',
                onDelete: 'cascade',
            })
        }
    };
    Commentaire.init({
        userId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        postId: DataTypes.INTEGER(11)
    }, {
        sequelize,
        modelName: 'Commentaire',
    });
    return Commentaire;
};