var models = require('../db/models.js');
var util = require('../core/utilities.js');
module.exports = function(router) {

  var reject = function(req, res, err) {
    util.log('RECEIVED a POST request', req.body);
    util.log('SENT error code to user', err);
    res.sendStatus(400);
  };

  var resolve = function(req, res, success) {
    util.log('RECEIVED a POST request', req.body);
    util.log('SENT success code to user', msg);
    res.sendStatus(201);
  };

  //input: {x: float, y: float, z: float, message: string, userToken: string}
  router.post('/messages', function(req, res) {
    models.createMessage(req.body).then(
        resolve.bind(this, req, res),
        reject.bind(this, req, res)
        );
  });

  //input: {userToken: string}
  router.post('/usertoken', function (req, res) {
    var token = req.body.userToken;
    models.createUser(token).then(
        resolve.bind(this, req, res),
        reject.bind(this, req, res)
        );
  });

  //input: {messageId: string, userToken: string}
  router.post('/upvote', function (req, res) {
    models.createVote(req.body.messageId, req.body.userToken).then(
        resolve.bind(this, req, res),
        reject.bind(this, req, res)
        );
  });

  //input: {messageId: string, message: string}
  router.post('/comment', function (req, res) {
    models.createComment(req.body).then(
        resolve.bind(this, req, res),
        reject.bind(this, req, res)
        );
  });
};
