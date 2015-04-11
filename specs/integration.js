var chai = require('chai');
var expect = chai.expect;
var models = require('../server/db/models');
var request = require('request');

var localServerUri = 'http://127.0.0.1:3000/';
var getMessagesUri = localServerUri + 'messages/?x=100.123456&y=-50.323&z=14.4244';
var testUser = {userToken: 'ABCDEFG'};
var postData = {url: localServerUri + 'usertoken', form: testUser};


describe('server to database integration', function() {

  after(function(done) {
    models.deleteRow('marks', ['x', 100.123459]).then(function() {
      models.deleteRow('messages', ['messageString', 'hello database!']).then(function() {
        models.deleteRow('users', ['token', 'ABCDEFG']).then(function() {
          done();
        });
      });
    });
  });

  it('should POST a new user token to the database', function(done) {
    request.post(postData, function(err, response) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should GET messages from the database', function(done) {
    request(getMessagesUri, function(err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
