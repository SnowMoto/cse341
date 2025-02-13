const express = require('express');
const router = express.Router();

const userController = require('../controller/user_profile');
const validation = require('../validation/validate');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', validation.rules, userController.createUser);

//Next Week
router.put('/:id', validation.rules, userController.updateUser);
//Next Week
router.delete('/:id', userController.deleteUser);

module.exports = router;