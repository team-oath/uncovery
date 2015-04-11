var db = require('./config');
var util = require('../core/utilities');


// insert(string, object)
exports.insert = function(table, data) {
  return new Promise(function(resolve, reject) {
    var query = 'INSERT INTO ?? SET ?';
    var params = [table, data];
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

//selectAll(string tableName)
exports.selectAll = function(table) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM ??';
    db.connection.query(query, table, function(err, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(fields);
      }
    });
  });
};

//filters is an array of key value pairs
//filters follows this structure:
// -- [key1, value1, key2, value2 ...etc]
// where(string tableName, [string key1, string value1])
exports.where = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM ?? WHERE ?? = ?';
    var params = ([table]).concat(filters);
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

//update(string tableName, [string key1, string value1, string key2, string value2]);
exports.update = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var params = ([table]).concat(filters);
    var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

//delete(string tableName, [string key, string value]);
exports.delete = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var params = ([table]).concat(filters);
    var query = 'DELETE FROM ?? WHERE ?? = ?';
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

//retrieveCount(string tableName, [string key, string value])
exports.retrieveCount = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var params = ([table]).concat(filters);
    var query = 'SELECT COUNT(*) FROM ?? WHERE ?? = ?';
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection[0]["COUNT(*)"]);
      }
    });
  });
}

exports.retrieveMarks = function(userData) {
  return new Promise(function(resolve, reject) {
    var query = ([
        'SELECT',
        'marks.id,',
        'marks.x,',
        'marks.y,',
        'marks.z,',
        'marks.timestamp,',
        'marks.messageId,',
        'marks.userToken,',
        'messages.messageString,',
        'messages.score,',
        'COUNT(comments.id),',
        'COUNT(votes.id)',
        'FROM marks',
        'LEFT JOIN messages ON messages.id = marks.messageId',
        'LEFT JOIN votes ON votes.messageId = messages.id',
        'LEFT JOIN comments ON comments.messageId = messages.id',
        'GROUP BY marks.id, messages.id',
        'ORDER BY marks.timestamp DESC'
    ]).join(' ');

    var params = [
      +userData.x - .01,
      +userData.x + .01,
      +userData.y - .01,
        +userData.y + .01
    ];

    db.connection.query(query, params, function(err, marks) {
      if (err) {
        reject(err);
      } else {
        resolve(util.createResponseObjects(marks, userData));
      }
    });
  });
};
