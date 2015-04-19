var io;
var connections = {};

var events = {
  init: function(data) {
    connections[data.userToken] = this;
    this.emit('init');
  },

  update: function() {
    console.log('user updated');
  },

  disconnect: function() {
    console.log('user disconnected');
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
