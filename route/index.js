const express = require('express');
const router = express.Router();

router.use('/user_profile', require('./user_profile.js'));

router.use('/dirt_bikes', require('./dirt_bike.js'));

router.use('/', require('./swagger.js'));

module.exports = router;
