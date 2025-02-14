const express = require('express');
const router = express.Router();

const userController = require('../controller/user_profile');
const validation = require('../validation/validate');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', validation.rules, userController.createUser);

router.put('/:id', validation.rules, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;