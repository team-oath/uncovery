var express = require('express');
var models = require('../db/models.js');
var util = require('../core/utilities.js');
var router = express.Router();

router.get('/', function (req, res) {
  util.log('RECEIVED a GET request', req.query);

  models.retrieveMarks(req.query)
    .then(function(msg) {
      util.log('SENT message array to user', msg);
      res.status(200);
      res.send(msg);
    }, function(err) {
      util.log('SENT error code to user', err);
      res.sendStatus(400);
    });
});

router.post('/', function(req, res) {
  util.log('RECEIVED a POST request', req.body);

  models.createComment(req.body)
    .then(function(msg) {
      util.log('SENT success code to user', msg);
      res.sendStatus(201);
    }, function(err) {
      util.log('SENT error code to user', err);
      res.sendStatus(400);
    });
});

router.post('/usertoken', function (req, res) {
  var token = req.body.userToken;
  util.log('RECEIVED a new user token from user', token);

  models.createUser(token)
    .then(function(user) {
      util.log('SENT success code to user', user);
      res.sendStatus(201);
    }, function(err) {
      util.log('SENT error code to user', err);
      res.sendStatus(400);
    });
});

router.post('/upvote', function (req, res) {
  util.log('RECEIVED upvote request', req.body);
  models.createVote(+req.body.messageId, req.body.userToken);
  res.sendStatus(200);
});

router.post('/comment', function (req, res) {
  util.log("RECEIVED comment", req.body)
  res.sendStatus(200);
});

module.exports = router;
