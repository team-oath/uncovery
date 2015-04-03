var express = require('express');
var bodyParser = require('body-parser');
var models = require('./server/db/models.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  console.log(req.body);
  res.send('works');
});

app.post('/', function(req, res) {
  console.log('Received a post request');
  console.log(req.body);

  models.insert(req.body, function(msg) {
    console.log(msg);
    res.status(201);
    res.send('works');
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
