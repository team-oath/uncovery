var express = require('express');
var models = require('../db/models.js');
var util = require('../core/utilities.js');
var router = express.Router();

router.get('/', function (req, res) {
  util.log('RECEIVED a GET request', req.query);

  models.retrieveMarks(req.query)
    .then(function(msg) {
      util.log('SENT message array to user', msg);
      res.send(msg);
    }, function(err) {
      util.log('SENT error code to user', err);
      res.send(400);
    });
});

router.post('/', function(req, res) {
  util.log('RECEIVED a POST request', req.body);

  models.createComment(req.body)
    .then(function(msg) {
      util.log('SENT success code to user', msg);
      res.status(201).send();
    }, function(err) {
      util.log('SENT error code to user', err);
      res.send(400);
    });
});

router.post('/usertoken', function (req, res) {
  var token = req.body.userToken;
  util.log('RECEIVED a new user token from user', token);

  models.createUser(token)
    .then(function(user) {
      util.log('SENT success code to user', msg);
      res.send(201);
    }, function(err) {
      util.log('SENT error code to user', err);
      res.send(400);
    });
});

router.post('/upvote', function (req, res) {
  util.log('RECEIVED upvote request', req.body);
  models.createVote(+req.body.messageId, req.body.userToken);
  res.status(200).send();
});

router.post('/comment', function (req, res) {
  util.log("RECEIVED comment", req.body)
  res.status(200).send();
});

module.exports = router;
