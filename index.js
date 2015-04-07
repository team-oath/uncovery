var express = require('express');
var bodyParser = require('body-parser');
var models = require('./server/db/models.js');
var util = require('./server/core/utilities.js');
var app = express();
var shortid = require('shortid');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/usertoken', function (req, res) {
  var userToken = shortid.generate();
  util.log('SENT a user token to user', userToken);
  res.send({userToken: userToken});
});

app.get('/', function (req, res) {
  util.log('RECEIVED a GET request', req.query);

  models.retrieve(req.query, function(msg) {
    if (Array.isArray(msg)) {
      util.log('SENT message array to user', msg);
      res.send(msg);
    } else {
      util.log('SENT error code to user', msg);
      res.send(msg);
    }
  });
});

app.post('/', function(req, res) {
  util.log('RECEIVED a POST request', req.body);

  models.insert(req.body, function(msg) {
    util.log('SENT success code to user', msg);

    res.status(201).send();
  });
});

app.post('/upvote', function (req, res) {
  util.log('Upvote request received: ', req.body);
  res.status(201).send();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Uncovery listening at http://%s:%s', host, port);
});
