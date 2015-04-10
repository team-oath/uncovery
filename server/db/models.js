var db = require('./modelAdapters');

//exports.createComment({message: 'Excellant, it works!', x: 535, y: 325, z: 325, userToken: 'live'});
exports.createComment = function(userData) {
  db.insert('messages', {messageString: userData.message}).then(function(success) {
    db.insert('marks', {
      x: userData.x,
      y: userData.y,
      z: userData.z,
      userToken: userData.userToken,
      messageId: success.insertId
    });
  });
};

//exports.createUser('grgrdg');
exports.createUser = function(token) {
  db.insert('users', {token: token});
};

//exports.createVote(3, 'grgrdg');
exports.createVote = function(messageId, token) {
  db.insert('votes', {userToken: token, messageId: messageId});
};

//exports.retrieveMarks({x: 535, y: 325, z: 325}).then(callback(success));
exports.retrieveMarks = db.retrieveMarks;

//exports.retrieveScore(3).then(callback(success));
exports.retrieveScore = function(messageId, objectToFill) {
  return new Promise(function(resolve, reject) {
    db.where('messages', ['id', messageId])
      .then(function(success) {
        resolve(success[0].score);
      },
      function(err) {
        reject(err);
      });
  });
};

//exports.updateScore(3, 9001);
exports.updateScore = function(messageId, amount) {
  db.update('messages', ['score', amount, 'id', messageId]);
};
