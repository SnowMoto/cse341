const express = require('express');
const professionController = require('../controller/profession');
const userController = require('../controllers');

const router = express.Router();

//Get data from controller
router.get('/', professionController.getData);

const userController = require('../controllers/user');

routes.get('/', userController.getUser);
routes.get('/username', userController.getUsername);

//export to port
module.exports = router;