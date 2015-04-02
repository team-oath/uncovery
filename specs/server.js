var chai = require('chai');
var expect = chai.expect;
var request = require('request');
var localServerUri = 'http://127.0.0.1:3000/';
var invalidUri = 'http://127.0.0.1:3000/invalid';

describe('server http routing', function(){
  it('should receive status code 200 on GET request', function(done) {
    request(localServerUri, function (err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should receive status code 201 on POST request', function(done) {
    request.post({url:localServerUri, form: {key:'value'}}, function(err, response, body) { 
      expect(response.statusCode).to.equal(201);
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
