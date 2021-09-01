module.exports = (sequelize, DataTypes) => {
    const commentaire = sequelize.define("commentaire", {
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
        postId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });
    return commentaire;
}