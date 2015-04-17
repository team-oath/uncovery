var chai = require('chai');
var models = require('../server/db/models.js');
var expect = chai.expect;
var request = require('request');
var messageUri = 'http://127.0.0.1:3000/api/messages';
var upvoteUri = 'http://127.0.0.1:3000/api/upvote';
var invalidUri = 'http://127.0.0.1:3000/api/invalid';

describe('Node Server', function(){

  var testData = {
    x: 110.123456,
    y: -50.323,
    z: 14.4244,
    score: -10,
    message: 'hello server',
    userToken: 'foobar'
  };

  var testData2 = {
    x: 10,
    y: 10,
    z: 10,
    message: 'For Auir!',
    userToken: 'foobar',
    messageId: null
  };

  before(function(done) {
    models.createUser(testData.userToken).then(function() {
      models.createMessage(testData2).then(function(message) {
        testData2.messageId = message.messageSuccess.insertId;
        done();
      });
    });
  });

  after(function(done) {
    models.deleteMarkByUserToken(testData.userToken)
      .then(function() {
        return models.deleteVotesByUserToken(testData.userToken);
      }).then(function() {
        return models.deleteUser(testData.userToken);
      }).then(function() {
        return models.deleteMessagesByScore(-10);
      }).then(function() {
        return models.deleteMessage(testData2.messageId);
      }).then(function() {
        done();
      });
  });

  describe('Basic http routing', function() {

    it('should receive status code 201 on POST request', function(done) {
      request.post({url: messageUri, form: testData}, function(err, response) {
        expect(response.statusCode).to.equal(201);
        done();
      });
    });

    it('should receive status code 200 on GET request', function(done) {
      var GETuri = messageUri + '/?x=' + testData.x + '&y=' + testData.y + '&z=' + testData.z;
      request(GETuri, function (err, response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should receive status code 404 on GET request to an invalid endpoint', function(done) {
      request(invalidUri, function(err, response) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('Feature-based http routing', function(){

    it('should confirm receipt of an upvote', function(done) {
      request.post({url: upvoteUri, form: testData2}, function(err, response, body) {
        expect(response.statusCode).to.equal(201);
        done();
      });
    });
  });
});
