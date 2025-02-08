const express = require('express');
const router = express.Router();

const userController = require('../controller/user_profile');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', userController.createUser);

//Next Week
router.put('/:id', userController.updateUser);
//Next Week
router.delete('/:id', userController.deleteUser);

module.exports = router;