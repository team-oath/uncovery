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

  //input: {userToken: string, messageId: string, commentId: string}
  pmInit: function(data) {
    var id;

    // Check to see if a chat session already exists
    Object.keys(privateSessions).forEach(function(shortid) {
      var session = privateSessions[shortid];
      session.users.forEach(function(user) {
        if (data.userToken === user && data.messageId === session.messageId) {
          id = shortid;
        }
      });
    });

    if (id === undefined) {
      // Create a new session, since one doesn't already exist
      models.retrieveUserByContentId(data)
      .then(function(content) {
        var userA = data.userToken;
        var userB = content[0].userToken;

        id = util.createId();
        privateSessions[id] = {
          users: [userA, userB],
          messageId: data.messageId,
          messages: []
        };

        privateSessions[id].users.forEach(function(user) {
          exports.sendUserData(user, 'pmInit', {sessionId: id, messages: []});
        });
      });
    } else {
      // Send users the old session messages, since it exists
      privateSessions[id].users.forEach(function(user) {
        exports.sendUserData(user, 'pmInit', {
          sessionId: id,
          messages: privateSessions[id].messages
        });
      });
    }

  },

  //input: {content: string, sessionId: string}
  pmContent: function(data) {
    privateSessions[data.sessionId].users.forEach(function(user) {
      data.from = connections[user] === this ? 'you' : 'them';
      privateSessions[data.sessionId].messages.push(data);
      exports.sendUserData(user, 'pmContent', data);
    }.bind(this));
  },

  //input: {userToken: string}
  pmList: function(data) {
    var chats = [];
    Object.keys(privateSessions).forEach(function(id) {
      session = privateSessions[id];
      session.users.forEach(function(user) {
        if (data.userToken === user) {
          chats.push({
            messageId: session.messageId,
            chatName: util.createIdentity(user, session.messageId, 1)
          });
        }
      });
    });
    exports.sendUserData(data.userToken, 'pmList', {chats: chats});
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
