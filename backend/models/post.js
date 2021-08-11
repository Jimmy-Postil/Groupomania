const user = require("./user");

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        image: {
            type: DataTypes.STRING,
        },
    });
    return Post;
}