var fs = require('fs');
var aws = require('aws-sdk');

var photoBucket = new aws.S3({params: {Bucket: process.env.AWS_BUCKET}});
aws.config.update({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.s3uploader = function(file, newName) {
  return new Promise(function(resolve, reject) {
    photoBucket.upload({
      ACL: 'public-read',
      Body: fs.createReadStream(file),
      Key: newName,
      ContentType: 'application/octet-stream'
    }).send(function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};
