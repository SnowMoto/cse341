const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { route } = require('./user_profile.js');
const router = express.Router();

route.use(requiresAuth())

router.use('/user_profile', require('./user_profile.js'));

router.use('/dirt_bikes', require('./dirt_bike.js'));

router.use('/', require('./swagger.js'));

module.exports = router;
