var express = require('express');
var models = require('../db/models.js');
var router = express.Router();

require('./getRoutes.js')(router);
require('./postRoutes.js')(router);

module.exports = router;
