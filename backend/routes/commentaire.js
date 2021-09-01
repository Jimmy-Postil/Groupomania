const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const comCtrl = require('../controllers/commentaire');

//Routes
router.get('/', comCtrl.getAllCommentaire);
router.get('/:id', comCtrl.getOneCommentaire)
router.post('/', multer, comCtrl.createCommentaire);
router.put('/:id', multer, comCtrl.modifyCommentaire);
router.delete('/:id', comCtrl.deleteCommentaire);

module.exports = router;