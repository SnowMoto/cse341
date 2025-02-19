const express = require('express');
const router = express.Router();

const bikeController = require('../controller/dirt_bike');

router.get('/', bikeController.getAllBikes);

router.get('/:bike_model', bikeController.getSingleBike);

module.exports = router;