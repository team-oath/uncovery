var models = require('../db/models.js');
var util = require('../core/utilities.js');

module.exports = function(router) {

  //input: {x: float, y: float, z: float, message: string, userToken: string}
  router.post('/messages', function(req, res) {
    models.createMessage(req.body).then(
      util.resolvePOST.bind(this, req, res),
      util.rejectPOST.bind(this, req, res)
      );
  });

  //input: {userToken: string}
  router.post('/usertoken', function (req, res) {
    var token = req.body.userToken;
    models.createUser(token).then(
      util.resolvePOST.bind(this, req, res),
      util.rejectPOST.bind(this, req, res)
      );
  });

  //input: {messageId: string, userToken: string}
  router.post('/upvote', function (req, res) {
    models.createVote(req.body.messageId, req.body.userToken).then(
      util.resolvePOST.bind(this, req, res),
      util.rejectPOST.bind(this, req, res)
      );
  });

  //input: {messageId: string, x: float, y: float, z: float, commentString: string, userToken: string}
  router.post('/comment', function (req, res) {
    models.createComment(req.body).then(
      util.resolvePOST.bind(this, req, res),
      util.rejectPOST.bind(this, req, res)
      );
  });
};
