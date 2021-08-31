const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const postCtrl = require('../controllers/post');

//Routes
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost)
router.post('/', multer, postCtrl.addPost);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;