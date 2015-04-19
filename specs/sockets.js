var expect = require('chai').expect;
var io = require('socket.io-client');
var localServerUri = 'http://127.0.0.1:3000/';
var connection;

describe('Socket Server', function() {

  it('should receive a new socket connection', function(done) {
    connection = io(localServerUri);
    connection.on('connect', function() {
      done();
    });
  });

  it('should authenticate the connection', function(done) {
    var userObject = {userToken: 'ABCDEFG'};
    connection.emit('init', userObject);
    connection.on('init', function() {
      done();
    });
  });
});
