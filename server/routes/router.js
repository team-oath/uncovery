var express = require('express');
var morgan = require('morgan');
var models = require('../db/models.js');
var util = require('../core/utilities.js');
var router = express.Router();

router.use(morgan('combined', util.getLogStream()))
require('./getRoutes.js')(router);
require('./postRoutes.js')(router);

router.use(express.static(__dirname + '/../landing'));
module.exports = router;
