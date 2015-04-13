var chai = require('chai');
var expect = chai.expect;
var models = require('../server/db/models');
var request = require('request');

var localServerUri = 'http://127.0.0.1:3000/';
var getMessagesUri = localServerUri + 'messages/?x=100&y=100&z=100';
var getCommentsUri = localServerUri + 'comment/?x=100&y=100&z=100';
var testUser = {userToken: 'ABCDEFG'};
var postData = {url: localServerUri + 'usertoken', form: testUser};
var testMsg = {x: 100, y: 100, z: 100, message: 'hello database!', userToken: testUser.userToken};
var postMsg = {url: localServerUri + 'messages', form: testMsg};
var testComment = {x: 101, y: 101, z: 101, commentString: 'hello database comment!', userToken: testUser.userToken};
var postComment = {url: localServerUri + 'comment', form: testComment, userToken: testUser.userToken};
//input: {messageId: string, x: float, y: float, z: float, commentString: string, userToken: string}

describe('server to database integration', function() {

  after(function(done) {
    models.deleteRow('marks', ['x', testMsg.x])
    .then(function() {
      return models.deleteRow('marks', ['x', testComment.x]);
    })
    .then(function() {
      return models.deleteRow('comments', ['commentString', testComment.commentString])
    })
    .then(function() {
      return models.deleteRow('messages', ['messageString', testMsg.message])
    })
    .then(function() {
      return models.deleteRow('users', ['token', testUser.userToken])
    })
    .then(function() {
      done();
    });
  });

  it('should POST a new user token to the database', function(done) {
    request.post(postData, function(err, response) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should POST a new message to the database', function(done) {
    request.post(postMsg, function(err, response) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should POST a new comment to the database', function(done) {
    request(getMessagesUri, function(err, response) {
      var res = JSON.parse(response.body);
      testComment.messageId = res[0].messageId;
      request.post(postComment, function(err, response) {
        expect(response.statusCode).to.equal(201);
        done();
      });
    });
  });

  it('should GET messages from the database', function(done) {
    request(getMessagesUri, function(err, response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should GET comments from the database', function(done) {
    getCommentsUri += '&messageId=' + testComment.messageId;
    request(getCommentsUri, function(err, response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});
