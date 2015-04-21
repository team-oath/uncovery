var models = require('../db/models.js');
var io;
var connections = {};

var events = {

  //input: {userToken: string}
  init: function(data) {
    connections[data.userToken] = this;
    models.retrieveUserScore(data.userToken)
    .then(function(user) {
      exports.sendUserScore(user[0]);
    });
  },

  //input: {userToken: string, messageId: string}
  upvote: function(data) {
    models.createVote(data)
    .then(function(success) {
      return models.retrieveUserScore(data.userToken);
    }).then(function(user) {
      exports.sendUserScore(user[0]);
    });
  },

  disconnect: function() {
    for (var user in connections) {
      if (connections[user] === this) {
        delete connections[user];
      }
    }
  }
};

exports.initialize = function(server) {
  io = server;
  io.on('connection', function(socket) {
    for (var e in events) {
      socket.on(e, events[e]);
    }
  });
};

exports.sendUserScore = function(user) {
  if (connections.hasOwnProperty(user.token)) {
    connections[user.token].emit('score', {score: user.total_votes});
  }
};
