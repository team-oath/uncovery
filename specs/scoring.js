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

    var messageId = 1;

  before(function() {
    q.fcall(function(){
      setTimeout(models.insert.bind(this, testMessage), 100);
    }).then(function(){
      models.createUser(token);
    });
  });

  it('should have votes created in db when createVote is called', function(done) {
    models.createVote(messageId, token, function(err, res) {
      expect(res.insertId).to.be.a('number');
      done();
    });
  });

  it('should have score updated in db when updateScore is called', function(done) {
    var amount = 100;
    models.updateScore(messageId, amount, function(err, success) {
     expect(!!success).to.equal(true);
     done();
    });
  });

  it('should retrieve the specified table contents from db', function(done) {
    var tableName = 'votes';
    models.retrieveTable(tableName, function(err, success, fields) {
      expect(fields[0].table).to.equal(tableName);
      done();
    });
  });
});

