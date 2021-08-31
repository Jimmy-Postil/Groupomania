const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.User
const Post = db.Post

//Logique métiers des utilisateurs
//Création des nouveaux utilisateurs avec signup
exports.signup = (req, res, next) => {
    const pseudo = req.body.pseudo;
    const email = req.body.email;
    const password = req.body.password
    //Création d'un nouvel utilisateur et hashage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: pseudo,
                email: email,
                password: hash,
                isAdmin: false
            });
            //Si un champ du formulaire n'est pas remplie
            if (pseudo === null || email === null || password === null) {
                return res.status(401).json({ error: "Veuillez remplir tous les champs du formulaire" });
            }
            //Sauvegarde de l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}

//connexion d'un utilisateur
exports.login = (req, res, next) => {
    //Recherche de l'utilisateur dans la base de données
    const email = req.body.email;
    User.findOne({ where: { email: email } })
        .then(user => {
            //Si l'utilisateur n'est pas trouvé
            if (!user) {
                return res.status(401).json({ message: "Utilisateur non trouvé" })
            }
            //Comparaison du mot de passe de la requête avec celui de la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' })
                    }
                    //Si le mot de passe est le même on crée un token pour sécuriser le compte de l'utilisateur
                    res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        pseudo: user.pseudo,
                        email: email,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM TOKEN SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

//Suppression de l'utilisateur
exports.deleteUser = (req, res, next) => {
    let id = req.body.id
    Post.destroy({ where: { userId: id } })
        .then(() => User.destroy({ where: { id: id } }))
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }))
        .catch(error => res.status(500).json({ error }));
}


//Modification de l'utilisateur
exports.updateUser = (req, res, next) => {
    const id = req.body.id;
    const pseudo = req.body.pseudo;
    const email = req.body.email;
    const password = req.body.password;
    User.update(
        { password: password },
        { email: email },
        { pseudo: pseudo },
        { where: { id: id } }
    )
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

//Obtenir un utilisateur
exports.getOneUser = (req, res, next) => {
    const id = req.body.id;

    User.findOne(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de retrouver l'utilisateur avec l'id:" + id
            });
        });
}

//Obtenir tous les utilisateurs
exports.getAllUser = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
}