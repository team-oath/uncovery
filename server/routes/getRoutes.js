var models = require('../db/models.js');
var util = require('../core/utilities.js');
module.exports = function(router) {

  //{x: float, y: float, z: float}
  router.get('/messages', function (req, res) {
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

  //{messageId: string}
  router.get('/comment', function(req, res) {
    util.log('RECEIVED a GET request', req.query);
    models.retrieveComments(+req.query.messageId)
      .then(function(comments) {
        util.log('SENT comments to user', comments);
        res.status(200);
        res.send(comments);
      }, function(err) {
        util.log('SENT error code to user', err);
        res.sendStatus(400);
      });
  });
};
