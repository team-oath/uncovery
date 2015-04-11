var express = require('express');
var models = require('../db/models.js');
var util = require('../core/utilities.js');
var router = express.Router();

require('./getRoutes.js')(router);
require('./postRoutes.js')(router);

router.use(express.static(__dirname + '/../landing'));
module.exports = router;
