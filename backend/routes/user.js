const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

//Routes user
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userCtrl.updatePseudo);
router.put('/:id/set-password', auth, userCtrl.updatePassword);
router.put('/:id/set-image', auth, multer, userCtrl.updateImage);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;