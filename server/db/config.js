var mysql = require('mysql');

var db_config = {
  host: 'localhost',
  user: 'root',
  database: 'uncovery'
};

handleDisconnect();

function handleDisconnect() {
  exports.connection = mysql.createConnection(db_config);

  exports.connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  exports.connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
