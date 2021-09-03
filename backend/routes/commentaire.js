const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const comCtrl = require('../controllers/commentaire');
const auth = require('../middleware/auth');

//Routes
router.get('/', auth, comCtrl.getAllCommentaire);
router.get('/:id', auth, comCtrl.getOneCommentaire)
router.post('/', auth, multer, comCtrl.createCommentaire);
router.put('/:id', auth, multer, comCtrl.modifyCommentaire);
router.delete('/:id', auth, comCtrl.deleteCommentaire);

module.exports = router;