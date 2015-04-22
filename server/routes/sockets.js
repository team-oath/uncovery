var models = require('../db/models');
var util = require('../core/utilities');
var io;
var connections = {};
var privateSessions = {};

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

  //input: {userToken: string, messageId: string}
  pmInit: function(data) {
    models.retrieveUserByContentId(data)
    .then(function(content) {
      var userA = data.userToken;
      var userB = content[0].userToken;

      var id = util.createId();
      privateSessions[id] = [userA, userB];

      exports.sendUserData(userA, 'pmInit', {sessionId: id});
      exports.sendUserData(userB, 'pmInit', {sessionId: id});
    });

  },

  //input: {content: string, sessionId: string}
  pmContent: function(data) {
    var id = data.sessionId;

    privateSessions[id].forEach(function(user) {
      if (connections[user] === this) {
        data.from = 'you';
      } else {
        data.from = 'them';
      }
      exports.sendUserData(user, 'pmContent', data);
    }.bind(this));
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

exports.sendUserData = function(token, type, data) {
  if (connections.hasOwnProperty(token)) {
    connections[token].emit(type, data);
  }
}

exports.sendUserScore = function(user) {
  exports.sendUserData(user.token, 'score', {score: user.total_votes});
};
