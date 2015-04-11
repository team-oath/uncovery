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

  it('should have votes created when createVote is called', function(done) {
      models.createVote(messageId, token).then(function(res) {
        expect(res.insertId).to.be.a('number');
        done();
      });
  });

  it('should have score updated when updateScore is called', function(done) {
    var amount = 100;
    models.updateScore(messageId, amount).then(function(success) {
      expect(!!success).to.equal(true);
      done();
    });
  });

  it('should retrieve votes when retrieveVotes is called', function(done) {
    models.retrieveVotes(messageId).then(function(success) {
      expect(success).to.be.a('number');
      done();
    });
  });
});
