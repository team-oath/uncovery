var expect = require('chai').expect;
var request = require('request');
var io = require('socket.io-client');
var models = require('../server/db/models');
var localServerUri = 'http://127.0.0.1:3000/';
var testUser = {userToken: 'ABCDEFG'};
var testMsg = {x: 100, y: 100, z: 100, message: 'hello database!', userToken: testUser.userToken};
var testComment = {x: 101, y: 101, z: 101, commentString: 'hello database comment!', userToken: testUser.userToken};
var testVote = {userToken: testUser.userToken};
var postVote = {url: localServerUri + 'api/upvote', form: testVote};
var testPM = {content: 'hello!!'};
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

  describe('Connections', function() {
    it('should create a new socket connection', function(done) {
      connection = io(localServerUri);
      connection.on('connect', function() {
        done();
      });
    });

    it('should authenticate the connection and receive a score', function(done) {
      connection.emit('init', testUser);
      connection.once('score', function() {
        done();
      });
    });
  });

  describe('Voting', function() {
    it('should return a user\'s score after receiving an upvote via socket event', function(done) {
      connection.emit('upvote', testVote);
      connection.once('score', function(data) {
        expect(data.score).to.equal(1);
        done();
      });
    });

    it('should return a user\'s score after receiving an upvote via POST request', function(done) {
      request.post(postVote);
      connection.once('score', function(data) {
        expect(data.score).to.equal(0);
        done();
      });
    });
  });

  describe('Private Messaging', function() {
    it('should initialize a private message session', function(done) {
      connection.emit('pmInit', testVote);
      connection.once('pmInit', function(data) {
        testPM.sessionId = data.sessionId;
        expect(data.sessionId).to.not.be.undefined;
        done();
      })
    });

    it('should send and receive a private message', function(done) {
      connection.emit('pmContent', testPM);
      connection.once('pmContent', function(data) {
        expect(data.content).to.equal(testPM.content);
        done();
      })
    });

    it('should get a list of private message sessions', function(done) {
      connection.emit('pmList', testVote);
      connection.once('pmList', function(data) {
        expect(data.chats[0].messageId).to.equal(testVote.messageId);
        done();
      });
    });

    it('should get a prior message conversation', function(done) {
      connection.emit('pmInit', testVote);
      connection.once('pmInit', function(data) {
        expect(data.sessionId).to.equal(testPM.sessionId);
        done();
      });
    });
  });
});
