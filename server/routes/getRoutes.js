var models = require('../db/models.js');
var util = require('../core/utilities.js');

module.exports = function(router) {

  //{x: float, y: float, z: float}
  router.get('/messages', function (req, res) {
    models.retrieveMarks(req.query).then(
      util.resolveGET.bind(this, req, res),
      util.rejectGET.bind(this, req, res)
      );
  });

  //{messageId: string}
  router.get('/comment', function(req, res) {
    models.retrieveComments(req.query).then(
      util.resolveGET.bind(this, req, res),
      util.rejectGET.bind(this, req, res)
      );
  });

  //{image: string}
  router.get('/images', function(req, res) {
    res.setHeader("Content-Type", "image/jpg");
    util.getImage(req.query.image).then(
      util.resolveGET.bind(this, req, res),
      util.rejectGET.bind(this, req, res)
    );
  })
};
