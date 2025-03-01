const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { route } = require('./user_profile.js');
const router = express.Router();

//router.use(requiresAuth())

router.use('/user_profile', requiresAuth(), require('./user_profile.js'));

router.use('/dirt_bikes', requiresAuth(), require('./dirt_bike.js'));

router.use('/api-docs', requiresAuth(), require('./swagger.js'));

module.exports = router;
