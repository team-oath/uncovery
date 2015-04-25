var models = require('../db/models');
var util = require('../core/utilities');
var tester = 'ABCDEFG';
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

    // Check to see if a chat session already exists and send if it does
    checkSessions(data.userToken, function(session, shortid) {
      if (data.messageId === session.messageId) {
         id = shortid;
         broadcastMessages(id);
        }
    });

    if (id !== undefined) return;

    // Create a new session, since one doesn't already exist
    models.retrieveUserByContentId(data)
    .then(function(content) {
      if (data.userToken !== content[0].userToken || data.userToken === tester) {
        id = util.createId();
        privateSessions[id] = {
          users: [data.userToken, content[0].userToken],
          messageId: data.messageId,
          messages: []
        };
        broadcastMessages(id);
      }
    });
  },

  //input: {content: string, sessionId: string}
  pmContent: function(data) {
    privateSessions[data.sessionId].users.forEach(function(user, i) {
      data.from = (i === 0 && connections[user] === this) ||
                  (i !== 0 && connections[user] !== this) ? 'you' : 'them';
      data.creator = i === 0;
      if (i === 0) {
        privateSessions[data.sessionId].messages.push({
          sessionId: data.sessionId,
          content: data.content,
          from: data.from
        });
      }
      exports.sendUserData(user, 'pmContent', data);
    }.bind(this));
  },

  //input: {userToken: string}
  pmList: function(data) {
    var chats = [];
    checkSessions(data.userToken, function(session, id, user) {
      chats.push({
        messageId: session.messageId,
        chatName: util.createIdentity(user, session.messageId, 1)
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

// Loop through all private sessions for a specific user token
function checkSessions(token, cb) {
  Object.keys(privateSessions).forEach(function(id) {
    var session = privateSessions[id];
    session.users.forEach(function(user) {
      if (token === user) {
        cb(session, id, user);
      }
    });
  });
}

function broadcastMessages(id) {
  privateSessions[id].users.forEach(function(user, i) {
    exports.sendUserData(user, 'pmInit', {
      sessionId: id,
      messages: privateSessions[id].messages,
      creator: i === 0
    });
  });
}
