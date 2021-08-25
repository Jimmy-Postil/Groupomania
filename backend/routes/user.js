const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//Routes
router.get('/', userCtrl.getUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;