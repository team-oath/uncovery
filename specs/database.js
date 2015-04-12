var chai = require('chai');
var expect = chai.expect;
var models = require('../server/db/models');

var messageData = {
  message: 'Excellant, it works!',
  x: 10,
  y: 10,
  z: 10,
  userToken: 'foobar',
  score: -10
};


xdescribe('database storage', function() {

    before(function(done) {
      models.createUser(messageData.userToken).then(function() {
        done();
      });
    });
  var voteId;

  it('should create a new message, user, and mark', function(done) {
    models.createMessage(messageData).then(function(success) {
      messageData.id = success.messageSuccess.insertId;
      expect(messageData.id).to.be.a('number');
      done();
    });
  });

  it('should create a new comment', function(done) {
    models.createComment({messageId: messageData.id, message: 'works'}).then(function(success) {
      var id = success.insertId;
      expect(id).to.be.a('number');
      done();
    });
  });

  it('should create a new vote', function(done) {
    models.createVote(messageData.id, messageData.userToken).then(function(success) {
      voteId = success.insertId;
      expect(voteId).to.be.a('number');
      done();
    });
  });

  it('should delete a mark when provided with a user token', function(done) { 
    models.deleteMarkByUserToken(messageData.userToken).then(function(success) {
      expect(!!success).to.equal(true);
      done();
    });
  });


  //deleteVote(string voteId)

  it('should delete a vote when provided with the voteId', function(done) {
    models.deleteVote(voteId).then(function(success) {
      var id = success.insertId;
      expect(id).to.be.a('number');
      done();
    });
  });

  it('should delete a user when provided with a user token', function(done) {
    models.deleteUser(messageData.userToken).then(function(success) {
      expect(!!success).to.equal(true);
      done();
    }, function(err){console.log(err)}); 
  });
});

