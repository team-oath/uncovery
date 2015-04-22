// var AWS = require('aws-sdk');
// var fs = require('fs');
// var zlib = require('zlib');
// AWS.config.region = 'us-west-2';
//
// var body = fs.createReadStream('bigfile');
// var s3 = new AWS.S3({params: {Bucket: 'privy-app'});
// s3.upload({Body: body}).
//   on('httpUploadProgress', function(evt) { console.log(evt); }).
//   send(function(err, data) { console.log(err, data) });
