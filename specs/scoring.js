var chai = require('chai');
var expect = chai.expect;
var db = require('../server/db/config');
var models = require('../server/db/models');
var q = require('q');

describe('scoring', function() {

    var testMessage = {
      x: 37.783599,
      y: -122.408974,
      z: 69,
      message: 'Brooks was here'
    };

    var token = '' + Math.random();

  before(function() {
    q.fcall(function(){ 
      setTimeout(models.insert.bind(this, testMessage), 100);
    }).then(function(){
      models.createUser(token);
    });
  });

  it('should create votes', function(done) {
    var messageId = 1;
    models.createVote(messageId, token, function(err, res) {
      expect(res.insertId).to.be.a('number');
      done();
    });
  });
});

