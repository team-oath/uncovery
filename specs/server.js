var chai = require('chai');
var models = require('../server/db/models.js');
var expect = chai.expect;
var request = require('request');
var localServerUri = 'http://127.0.0.1:3000/';
var invalidUri = 'http://127.0.0.1:3000/invalid';
var testData = {
  x: 110.123456,
  y: -50.323,
  z: 14.4244,
  message: 'hello server',
  userToken: 'foobar'
};

describe('Node Server', function(){
  
  before(function(done) {
    models.createUser(testData.userToken).then(function() {
      done();
    });
  });

  after(function(done) {
    models.deleteUser(testData.userToken).then(function() {
      done();
    });
  });

  xdescribe('Basic http routing', function(){
    it('should receive status code 201 on POST request', function(done) {
      request.post({url: localServerUri, form: {key:'value'}}, function(err, response, body) {
        expect(response.statusCode).to.equal(201);
        done();
      });
    });

    it('should receive status code 200 on GET request', function(done) {
      request(localServerUri, function (err, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should receive status code 404 on GET request to an invalid endpoint', function(done) {
      request(invalidUri, function(err, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  xdescribe('Feature-based http routing', function(){
    it('should send a unique user token to the user', function(done) {
      request(localServerUri + 'usertoken', function(err, response, body) {
        var body = JSON.parse(response.body);
        expect(body.userToken).to.not.be.an('undefined');
        done();
      });
    });

    it('should confirm receipt of an upvote', function(done) {
      request.post({url:localServerUri + 'upvote'}, function(err, response, body) {
        expect(response.statusCode).to.equal(201);
        done();
      });
    });
  });
});
