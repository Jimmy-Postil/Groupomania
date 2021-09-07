const fs = require('fs');
const db = require("../models");
const Post = db.Post
const User = db.User

//Obtenir tous les posts
exports.getAllPost = (req, res, next) => {
    Post.findAll({
        include: [{ model: User }],
        order: [['createdAt', 'DESC']],
    })
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(400).json({ error }));
}

//Obtenir un seul post
exports.getOnePost = (req, res, next) => {
    const id = req.params.id;
    Post.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de récupérer le post"
            });
        });
}

//Création d'un post
exports.addPost = (req, res, next) => {
    const userId = req.body.userId;
    const content = req.body.content;
    const postFile = req.body.image;
    const pseudo = req.body.pseudo;
    if (content === null) {
        return res.status(400).json({ 'error': 'Impossible de publier un contenu vide' })
    }

    const newPost = new Post({
        userId: userId,
        content: content,
        pseudo: pseudo,
        image: postFile !== '' ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    })

    newPost.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));

}

//Modification d'un post
exports.modifyPost = (req, res, next) => {
    const id = req.params.id;
    const modify = req.file ? {
        content: req.body.content,
        userId: req.body.userId,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : {
        content: req.body.content,
        userId: req.body.userId,
    };

    Post.update(modify, { where: { id: id } })
        .then(() => res.status(200).json({ message: 'Post modifié' }))
        .catch(error => res.status(400).json({ error }));

}

//Suppresion d'un post
exports.deletePost = (req, res, next) => {
    let id = req.params.id
    Post.findOne({ where: { id: id } })
        .then(post => {
            const filename = post.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { id: id } })
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};