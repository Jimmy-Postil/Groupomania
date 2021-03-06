const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.User
const Post = db.Post
const Commentaire = db.Commentaire

//Logique métiers des utilisateurs
//Création des nouveaux utilisateurs avec signup
exports.signup = (req, res, next) => {
    let isAdmin = "";
    if (req.body.email === "jimmy@gmail.com") {
        isAdmin = true
    } else {
        isAdmin = false
    }
    const pseudo = req.body.pseudo;
    const email = req.body.email;
    const password = req.body.password

    //Si un champ du formulaire n'est pas remplie
    if (pseudo == null || email == null || password == null) {
        return res.status(400).json({ error: "Veuillez remplir tous les champs du formulaire" });
    }
    //Création d'un nouvel utilisateur et hashage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: pseudo,
                email: email,
                password: hash,
                isAdmin: isAdmin
            });
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
    let id = req.params.id
    Commentaire.destroy({ where: { userId: id } })
        .then(() => Post.destroy({ where: { userId: id } })
            .then(() => User.destroy({ where: { id: id } }))
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
            .catch(error => res.status(400).json({ error }))
            .catch(error => res.status(400).json({ error }))
            .catch(error => res.status(500).json({ error })));
}


//Modification du pseudo
exports.updatePseudo = (req, res, next) => {
    const id = req.params.id;
    const pseudo = req.body.pseudo;
    User.update(
        {
            pseudo: pseudo,
        },
        { where: { id: id } }
    )
        .then(() => res.status(200).json({ message: 'Pseudo modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

//Modification du mot de passe
exports.updatePassword = (req, res, next) => {
    const id = req.params.id;
    const password = req.body.password;
    console.log(req.body);
    bcrypt.hash(password, 10)
        .then(hash => {
            User.update(
                {
                    password: hash,
                }, { where: { id: id } })
                .then(() => res.status(200).json({ message: 'Mot de passe modifié !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => { console.log(error); return res.status(500).json({ error }) });
}

//Modification de l'image de profil
exports.updateImage = (req, res, next) => {
    const id = req.params.id;
    const postFile = req.body.image;
    const url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    User.update(
        {
            image: postFile !== '' ? url : null
        },
        { where: { id: id } }
    )
        .then(() => res.status(200).json({ image: url }))
        .catch(error => res.status(400).json({ error }));
}

//Obtenir un utilisateur
exports.getOneUser = (req, res, next) => {
    const id = req.params.id;

    User.findByPk(id)
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
