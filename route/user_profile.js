const express = require('express');
const router = express.Router();

const userController = require('../controller/user_profile');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;