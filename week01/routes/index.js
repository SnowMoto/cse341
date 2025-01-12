const routes = require('express').Router();
const less1Controller = require('../controllers');

routes.get ('/', less1Controller.nameRoute);

module.exports = routes;