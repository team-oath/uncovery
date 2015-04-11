var models = require('../db/models.js');
var util = require('../core/utilities.js');

var reject = function(req, res, err) {
  util.log('RECEIVED a GET request', req.query);
  util.log('SENT error code to user', err);
  res.sendStatus(400);
};

var resolve = function(req, res, success) {
  util.log('RECEIVED a GET request', req.query);
  util.log('SENT successful response to user', success);
  res.status(200);
  res.send(success);
};

module.exports = function(router) {

  //{x: float, y: float, z: float}
  router.get('/messages', function (req, res) {
    models.retrieveMarks(req.query).then(
          resolve.bind(this, req, res),
          reject.bind(this, req, res)
          );
  });

  //{messageId: string}
  router.get('/comment', function(req, res) {
    models.retrieveComments(req.query.messageId).then(
          resolve.bind(this, req, res),
          reject.bind(this, req, res)
          );
  });
};
