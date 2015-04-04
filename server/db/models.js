var db = require('./config');
var util = require('../core/utilities');

db.initialize();

exports.insert = function(userData, callback) {
  if (validateInput(userData)) {
    var message = createMessage(userData);
    db.connection.query('INSERT INTO messages SET ?', message, function(err, msg) {
      if (err) callback(err);
      var mark = createMark(userData, msg.insertId);
      db.connection.query('INSERT INTO marks SET ?', mark, function(err, mark) {
        if (err) callback(err);
        callback('Successfully inserted new message and mark to database.');
      });
    });
  } else {
    callback('Could not insert new message: invalid input.');
  }
};

var validateInput = function(userData) {
  if (!userData.x || !userData.y || !userData.z || !userData.message) {
    return false;
  }
  return true;
};

var validateQuery = function(userData) {
  if (!userData.x || !userData.y || !userData.z) {
    return false;
  }
  return true;
};

var createMark = function(userData, messageId) {
  var mark = {
    x: userData.x,
    y: userData.y,
    z: userData.z,
    messageId: messageId
  };
  return mark;
};

var createMessage = function(userData) {
  var message = {
    messageString: userData.message
  };
  return message;
};

exports.retrieve = function(userLocation, callback) {

  if (validateQuery(userLocation)) {
    var query = ([
      'SELECT *',
      'FROM marks',
      'LEFT JOIN messages',
      'ON marks.messageId = messages.id',
      'WHERE x between ? AND ?',
      'AND y between ? AND ?',
      'ORDER BY timestamp DESC'
    ]).join(' ');

    var params = [
      +userLocation.x - .01,
      +userLocation.x + .01,
      +userLocation.y - .01,
      +userLocation.y + .01,
    ];

    db.connection.query(query, params, function(err, marks) {
      if (err) callback(err);

      callback(util.createResponseObjects(marks, userLocation));
    });
  } else {
    callback('Could not complete request: invalid query parameters.');
  }
};

exports.removeData = function(table, property, value) { 
 var query = 'DELETE FROM ' + table + ' WHERE ' + property + ' = ' + value; 
  db.connection.query(query, function(err, success) { 
    if (err) console.log('error: ', err); 
  }); 
}; 
