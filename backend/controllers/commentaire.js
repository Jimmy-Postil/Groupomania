const db = require("../models/");
const Commentaire = db.Commentaire;
const User = db.User;
const Post = db.Post;

//Obtenir tous les commentaires
exports.getAllCommentaire = (req, res, next) => {
    Commentaire.findAll({
        include: [{ model: User }, { model: Post }],
        order: [['updatedAt', "DESC"], ['createdAt', "DESC"]]
    })

        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "erreur lors de la récupération des Commentaires"
            });
        });
};

//Obtenir un commentaire
exports.getOneCommentaire = (req, res, next) => {
    const id = req.params.id;
    Commentaire.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Problème de récupération du commentaire avec l'id=" + id
            });
        });
}

//Création d'un commentaire
exports.createCommentaire = (req, res, next) => {
    const commentaire = {
        content: req.body.content,
        PostId: req.body.postId,
        userId: req.body.userId,
    };
    Commentaire.create(commentaire)
        .then(commentaire => {
            res.send(commentaire);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la création du commentaire "
            });
        });

};

//Modification d'un commentaire
exports.modifyCommentaire = (req, res, next) => {
    const id = req.params.id;
    const modification = req.file ? {
        content: req.body.content,
        postId: req.body.postId,
        userId: req.body.userId,
    } : {
        content: req.body.content,
        postId: req.body.postId,
        userId: req.body.userId,
    }

    Commentaire.update(modification, {
        where: { id: id }
    })
        .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
        .catch(err => {
            res.status(500).send({
                message: "erreur lors de la mise à jour du commentaire avec l'id=" + id
            });
        });
};

//Suppresssion d'un commentaire
exports.deleteCommentaire = (req, res, next) => {
    const id = req.params.id;

    Commentaire.destroy({
        where: { id: id }
    })
        .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
        .catch(err => {
            res.status(500).send({
                message: "erreur lors de la suppression du commentaire avec l'id=" + id
            });
        });
};

