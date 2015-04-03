var chai = require('chai');
var expect = chai.expect;
var db = require('../server/db/config');
var models = require('../server/db/models');
var request = require('request');
var localServerUri = 'http://127.0.0.1:3000/';
var testData = {x: 100.123456, y: -50.323, z: 14.4244, message: 'hello database!'};

afterEach(function() {
  //clear all test data from mysql
});

describe('server to database integration', function() {
  it('should persist valid POST request to database', function(done) {
    request.post({url:localServerUri, form: testData}, function(err, response, body) { 
      models.retrieve(testData, function(messages) {
        expect(messages).to.be.a('array');
        done();
      });
    });
  });
});
