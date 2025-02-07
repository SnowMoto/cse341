const express = require('express');
const router = express.Router();

const contactsController = require('../controller/user_profile');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createUser);

module.exports = router;