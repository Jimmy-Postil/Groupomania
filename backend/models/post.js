'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {

        static associate(models) {

            models.Post.hasMany(models.Commentaire);
            models.Post.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: 'cascade'
            })
        }
    };
    Post.init({
        userId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};