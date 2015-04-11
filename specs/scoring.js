var chai = require('chai');
var expect = chai.expect;
var db = require('../server/db/config.js');
var models = require('../server/db/models.js');

describe('scoring', function() {

  var testMessage = {
    x: 37.783599,
    y: -122.408974,
    z: 69,
    message: 'Brooks was here'
  };

  var messageId;
  var token = '' + Math.random();

  before(function(done) {
    models.createUser(token).then(function() {
      testMessage.userToken = token;
      models.createMessage(testMessage).then(function(success) {
        messageId = success.messageSuccess.insertId
        done();
      });
    });
  });

  it('should have votes created in db when createVote is called', function(done) {
      models.createVote(messageId, token).then(function(res) {
        expect(res.insertId).to.be.a('number');
        done();
      });
  });

  xit('should have score updated in db when updateScore is called', function(done) {
    var amount = 100;
    models.updateScore(messageId, amount, function(err, success) {
      expect(!!success).to.equal(true);
      done();
    });
  });

  xit('should retrieve the specified table contents from db', function(done) {
    var tableName = 'votes';
    models.retrieveTable(tableName, function(err, success, fields) {
      expect(fields[0].table).to.equal(tableName);
      done();
    });
  });
});
