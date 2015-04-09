var express = require('express');
var shortid = require('shortid');
var models = require('../db/models.js');
var util = require('../core/utilities.js');
var router = express.Router();

router.get('/usertoken', function (req, res) {
  var userToken = shortid.generate();
  util.log('SENT a new user token to user', userToken);
  res.send({userToken: userToken});
});

router.get('/', function (req, res) {
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

router.post('/', function(req, res) {
  util.log('RECEIVED a POST request', req.body);

  models.insert(req.body, function(msg) {
    util.log('SENT success code to user', msg);

    res.status(201).send();
  });
});

router.post('/upvote', function (req, res) {
  util.log('RECEIVED upvote request', req.body);
  res.status(200).send();
});

router.post('/comment', function (req, res) {
  util.log("RECEIVED comment", req.body)
  res.status(200).send();
});

module.exports = router;
