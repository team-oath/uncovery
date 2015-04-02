var app = require('express')();
var server = require('http').createServer(app);
var MOCK_DATA = require('./mockData.js')

server.listen(6666, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});

console.log(MOCK_DATA);

app.get('/data', function(req, res){
  res.send(MOCK_DATA);
});