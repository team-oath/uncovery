var http = require('http');
var morgan = require('morgan');
var express = require('express');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');

var util = require('./server/core/utilities.js');
var router = require('./server/routes/router.js');
var sockets = require('./server/routes/sockets.js');

var app = express();
var server = http.Server(app);

app.use(morgan('combined', util.getLogStream()));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', router);
app.use(express.static(__dirname + '/server/landing'));

var io = socketIO(server);
sockets.initialize(io);

server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Uncovery listening at http://%s:%s', host, port);
});
