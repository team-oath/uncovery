var express = require('express');
var bodyParser = require('body-parser');
var models = require('./server/db/models.js');
var app = express();
var shortid = require('shortid')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/userid', function (req, res) {
  var userid = shortid.generate();
  res.send({id:userid});
});

app.get('/', function (req, res) {
  console.log('\nRECEIVED a GET request');
  console.log(req.query);

  models.retrieve(req.query, function(msg) {
    if (Array.isArray(msg)) {
      console.log('\nSENT message array to user')
      console.log(msg);

      res.send(msg);
    } else {
      console.log('\nSENT error code to user')
      console.log(msg);

      res.send(msg)
    }
  });
});

app.post('/', function(req, res) {
  console.log('\nRECEIVED a POST request');
  console.log(req.body);

  models.insert(req.body, function(msg) {
    console.log('\nSENT success code to user')
    console.log(msg);

    res.status(201);
    res.send('works');
  });
});

app.post('/upvote', function (req, res) {
  console.log('Upvote request received: ', req.body);
  res.status(201).send();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Uncovery listening at http://%s:%s', host, port);
});
