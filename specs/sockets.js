var expect = require('chai').expect;
var io = require('socket.io-client');
var models = require('../server/db/models');
var localServerUri = 'http://127.0.0.1:3000/';
var testUser = {userToken: 'ABCDEFG'};
var testMsg = {x: 100, y: 100, z: 100, message: 'hello database!', userToken: testUser.userToken};
var testComment = {x: 101, y: 101, z: 101, commentString: 'hello database comment!', userToken: testUser.userToken};
var testVote = {userToken: testUser.userToken};
var connection;

describe('Socket Server', function() {

  before(function(done) {
    models.createUser(testUser.userToken)
    .then(function() {
      return models.createMessage(testMsg);
    }).then(function(success) {
      testVote.messageId = success.messageSuccess.insertId;
      done();
    });
  });

  after(function(done) {
    models.deleteRow('marks', ['x', testMsg.x])
    .then(function() {
      return models.deleteRow('marks', ['x', testComment.x]);
    }).then(function() {
      return models.deleteRow('votes', ['userToken', testVote.userToken]);
    }).then(function() {
      return models.deleteRow('comments', ['commentString', testComment.commentString]);
    }).then(function() {
      return models.deleteRow('messages', ['messageString', testMsg.message]);
    }).then(function() {
      return models.deleteRow('users', ['token', testUser.userToken]);
    }).then(function() {
      done();
    });
  });

  it('should receive a new socket connection', function(done) {
    connection = io(localServerUri);
    connection.on('connect', function() {
      done();
    });
  });

  it('should authenticate the connection', function(done) {
    connection.emit('init', testUser);
    connection.on('init', function() {
      done();
    });
  });

  it('should update a user\'s score after upvoting', function(done) {
    connection.emit('upvote', testVote);
    connection.on('score', function(data) {
      expect(data.score).to.be.a.number;
      done();
    });
  });
});
