var chai = require('chai');
var expect = chai.expect;
var db = require('../server/db/config.js');
var models = require('../server/db/models.js');

describe('scoring', function() {

  var testData = {
    x: 37.783599,
    y: -122.408974,
    z: 69,
    message: 'Brooks was here',
    userToken: 'foobar4',
    messageId: null,
    markId: null,
    voteId: null
  };

  var testVote = {
    messageId: testData.messageId,
    userToken: testData.userToken
  };

  before(function(done) {
    models.createUser(testData.userToken).then(function() {
      models.createMessage(testData).then(function(success) {
        testData.messageId = success.messageSuccess.insertId;
        testData.markId = success.markSuccess.insertId;
        done();
      });
    });
  });

  after(function(done) {
    models.deleteMark(testData.markId)
      .then(function() {
      return models.deleteVote(testData.voteId);
    }).then(function() {
      return models.deleteMessage(testData.messageId);
    }).then(function() {
      return models.deleteUser(testData.userToken);
    }).then(function() {
      done();
    });
  });

  it('should have votes created when createVote is called', function(done) {
    models.createVote(testData).then(function(res) {
      testData.voteId = res.insertId;
      expect(testData.voteId).to.be.a('number');
      done();
    },function(err){console.log(err)});
  });

  it('should have score updated when updateScore is called', function(done) {
    var amount = 100;
    models.updateScore(testData.messageId, amount).then(function(success) {
      expect(!!success).to.equal(true);
      done();
    });
  });

  it('should retrieve votes when retrieveVotes is called', function(done) {
    models.retrieveVotes(testData.messageId).then(function(success) {
      expect(success).to.be.a('number');
      done();
    });
  });
});
