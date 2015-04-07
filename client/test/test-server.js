var app = require('express')();
var server = require('http').createServer(app);
var shortid = require('shortid');

var MOCK_DATA = require('./mockData.js')

server.listen(9090, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});

console.log(MOCK_DATA);

app.get('/', function(req, res){
  console.log(req.query);
  res.send(MOCK_DATA);
});

app.get('/userid', function(req, res){
	var userid = shortid.generate()
	res.send({id:userid});
});
