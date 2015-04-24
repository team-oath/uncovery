var chai = require('chai');
var expect = chai.expect;
var models = require('../server/db/models');

var voteId;
var testMsg = { message: 'Excellent, it works!', x: 10, y: 10, z: 10, userToken: 'foobar', score: -10 };
var testComment = { commentString: 'A most excellent post!', x: 10, y: 10, z: 10, userToken: testMsg.userToken };
var testVote = { userToken: testMsg.userToken };


describe('database storage', function() {

  before(function(done) {
    models.createUser(testMsg.userToken).then(function() {
      done();
    });
  });

  after(function(done) {
    models.deleteRow('marks', ['x', testMsg.x])
    .then(function() {
      return models.deleteRow('marks', ['x', testMsg.x]);
    }).then(function() {
      return models.deleteRow('votes', ['userToken', testVote.userToken]);
    }).then(function() {
      return models.deleteRow('comments', ['commentString', testComment.commentString]);
    }).then(function() {
      return models.deleteRow('messages', ['messageString', testMsg.message]);
    }).then(function() {
      return models.deleteRow('users', ['token', testMsg.userToken]);
    }).then(function() {
      done();
    });
  });

  it('should create a new message, user, and mark', function(done) {
    models.createMessage(testMsg).then(function(success) {
      testMsg.id = success.messageSuccess.insertId;
      testComment.messageId = testMsg.id;
      testVote.messageId = testMsg.id;
      expect(testMsg.id).to.be.a('number');
      done();
    });
  });


  it('should create a new comment', function(done) {
    models.createComment(testComment).then(function(success) {
      var id = success.commentSuccess.insertId;
      expect(id).to.be.a('number');
      done();
    });
  });

  it('should create a new vote', function(done) {
    models.createVote(testVote).then(function(success) {
      voteId = success.insertId;
      expect(voteId).to.be.a('number');
      done();
    });
  });

  it('should delete a mark when provided with a user token', function(done) {
    models.deleteMarkByUserToken(testMsg.userToken).then(function(success) {
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
    models.deleteUser(testMsg.userToken).then(function(success) {
      expect(!!success).to.equal(true);
      done();
    }, function(err){console.log(err)});
  });
});
