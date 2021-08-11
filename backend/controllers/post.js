const db = require("../models");
const Post = db.Post

exports.getAllPost = (req, res, next) => {
    Post.find({
        order: [['createAt', 'DESC']]
    })
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(400).json({ error }));
}