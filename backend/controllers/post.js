const db = require("../models");
const Post = db.Post

exports.getAllPost = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(400).json({ error }));
}

exports.addPost = (req, res, next) => {
    const userId = req.body.userId;
    const content = req.body.content;
    const postFile = req.body.image;
    if (content === null) {
        return res.status(400).json({ 'error': 'Impossible de publier un contenu vide' })
    }

    const newPost = new Post({
        userId: userId,
        content: content,
        image: postFile !== '' ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    })

    newPost.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.modifyPost = (req, res, next) => {
    const modify = req.file ? {
        content: req.body.content,
        userId: req.body.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : {
        content: req.body.content,
        userId: req.body.userId
    };

    Post.update({ where: { id: id } })
        .then(() => res.status(200).json({ message: 'Post modifié' }))
        .catch(error => res.status(400).json({ error }));

}

exports.deletePost = (req, res, next) => {
    let id = req.body.id
    console.log(req.body)
    Post.destroy({ where: { id: id } })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(500).json({ error }));
}