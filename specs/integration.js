var chai = require('chai');
var expect = chai.expect;
var models = require('../server/db/models');
var request = require('request');
var localServerUri = 'http://127.0.0.1:3000/';
var GETUri = localServerUri + '?x=100.123456&y=-50.323&z=14.4244';
var testData = {x: 100.123456, y: -50.323, z: 14.4244, message: 'hello database!'};
var testUser = {userToken: 'ABCDEFG'};

describe('server to database integration', function() {

  after(function() {
    models.delete('marks', ['x', 100.123459]);
    models.delete('messages', ['messageString', 'hello database!']);
    models.delete('users', ['token', 'ABCDEFG']);
  });

  it('should GET messages from the database', function(done) {
    request(GETUri + 'messages', function(err, response, body) {
      var messages = JSON.parse(response.body);
      expect(messages).to.be.a('array');
      done();
    });
  });

  it('should POST a new user token to the database', function(done) {
    request.post({url:localServerUri + 'usertoken', form: testUser}, function(err, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should persist valid POST request to database', function(done) {
    request.post({url:localServerUri + 'messages', form: testData}, function(err, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });
});
