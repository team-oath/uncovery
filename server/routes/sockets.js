var models = require('../db/models');
var util = require('../core/utilities');
var connections = {};
var privateSessions = {};

var events = {

  //input: {userToken: string}
  init: function(data) {
    connections[data.userToken] = this;
    models.retrieveUserScore(data.userToken)
    .then(sendRetrievedUser);
  },

  //input: {userToken: string, messageId: string}
  upvote: function(data) {
    models.createVote(data)
    .then(function(success) {
      return models.retrieveUserScore(data.userToken);
    }).then(sendRetrievedUser);
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
    privateSessions[data.sessionId].forEach(function(user) {
      data.from = connections[user] === this ? 'you' : 'them';
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
  server.on('connection', function(socket) {
    for (var e in events) {
      socket.on(e, events[e]);
    }
  });
};

exports.sendUserData = function(token, type, data) {
  if (connections.hasOwnProperty(token)) {
    connections[token].emit(type, data);
  }
};

exports.sendUserScore = function(user) {
  exports.sendUserData(user.token, 'score', {score: user.total_votes});
};

function sendRetrievedUser(users) {
  exports.sendUserScore(users[0]);
}
