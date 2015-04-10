var express = require('express');
var models = require('../db/models.js');
var util = require('../core/utilities.js');
var router = express.Router();

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
  models.createVote(+req.body.messageId, req.body.userToken);
  res.status(200).send();
});

router.post('/comment', function (req, res) {
  util.log("RECEIVED comment", req.body)
  res.status(200).send();
});

module.exports = router;
