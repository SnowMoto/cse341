const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts.js'));
router.use('/', require('./swagger.js'));

module.exports = router;
