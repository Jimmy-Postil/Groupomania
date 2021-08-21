const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const postCtrl = require('../controllers/post');

//Routes
router.get('/', postCtrl.getAllPost);
router.post('/', multer, postCtrl.addPost);
router.put('/', multer, postCtrl.modifyPost);
router.delete('/', postCtrl.deletePost);

module.exports = router;