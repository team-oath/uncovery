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

//filters is an array of key value pairs
//filters follows this structure:
// -- [key1, value1, key2, value2 ...etc]
// where(string tableName, [string key1, string value1])
exports.whereParams = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM ?? WHERE ?? = ?';
    var params = ([table]).concat(filters);

    for (var i = 1; i < filters.length / 2; i++) {
      query += ' AND ?? = ?';
    }

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

//deleteRow(string tableName, [string key, string value]);
exports.deleteRow = function(table, filters) {
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


//deleteRow(string tableName, [string key, string value]);
exports.deleteRowWhere = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var params = ([table]).concat(filters);
    var query = 'DELETE FROM ?? WHERE ?? = ?';

    for (var i = 1; i < filters.length / 2; i++) {
      query += ' AND ?? = ?';
    }

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
};

//exports.retrieveMarks({x: float, y: float, z: float, userToken: string})
exports.retrieveMarks = function(userData) {
  return new Promise(function(resolve, reject) {
    var sort = userData.sortByScore ? 'messages.score' : 'marks.timestamp';
    var query = ([
        'SELECT',
        'marks.*,',
        'messages.*,',
        'COUNT(distinct comments.id),',
        'COUNT(distinct votes.id)',
        'FROM messages',
        'LEFT JOIN marks ON marks.messageId = messages.id',
        'LEFT JOIN votes ON votes.messageId = messages.id',
        'LEFT JOIN comments ON comments.messageId = messages.id',
        'GROUP BY messages.id',
        'ORDER BY ?? DESC'
    ]).join(' ');

    var params = [sort];
    // var params = [
    //   +userData.x - .01,
    //   +userData.x + .01,
    //   +userData.y - .01,
    //     +userData.y + .01
    // ];

    db.connection.query(query, params, function(err, marks) {
      if (err) {
        reject(err);
      } else {
        resolve(util.createMessageResponseObjects(marks, userData));
      }
    });
  });
};

exports.retrieveComments = function(userData) {
  return new Promise(function(resolve, reject) {
    var query = ([
      'SELECT',
      'marks.*,',
      'comments.commentString,',
      'COUNT(votes.id)',
      'FROM comments',
      'LEFT JOIN marks ON marks.commentId = comments.id',
      'LEFT JOIN votes ON votes.commentId = comments.id',
      'WHERE comments.messageId = ?',
      'GROUP BY comments.id'
    ]).join(' ');

    var params = [userData.messageId];

    db.connection.query(query, params, function(err, marks) {
      if (err) {
        reject(err);
      } else {
        resolve(util.createCommentResponseObjects(marks, userData));
      }
    });
  });
};
