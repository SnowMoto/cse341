const express = require('express');
const router = express.Router();

const bikeController = require('../controller/dirt_bike');

router.get('/', bikeController.getAllBikes);

router.get('/:bike_model', bikeController.getSingleBike);

router.post('/', bikeController.addBike);

router.put('/:id', bikeController.updateBike);

module.exports = router;