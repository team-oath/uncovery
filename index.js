var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('works');
});

app.post('/', function(req, res) {
  console.log('Received a post request');
  console.log(req.body);
  res.status(201);
  res.send('works');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
