const express = require('express');
const router = express.Router();

router.use('/contacts', require('./user_profile.js'));
router.use('/', require('./swagger.js'));

module.exports = router;
