
var HOST = require('../config.js');

var createRequestURL = (route, props) => {

  var requestURL, params;
  

  if ( route === '/messages' ) {

    var userToken = props.userToken;
    var x = props.currentPosition.coords.latitude;
    var y = props.currentPosition.coords.longitude;
    var z = props.currentPosition.coords.altitude;
    params = `?x=${x}&y=${y}&z=${z}&userToken=${userToken}`;

  }  

  if ( route === 'comment/') {

    var id = props.messageId;
    var x = props.coords.latitude;
    var y = props.coords.longitude;
    var z = props.coords.altitude;
    params = `?messageId=${id}&x=${x}&y=${y}&z=${z}`;

  }

  requestURL = `${HOST}${route}${params}`
  return requestURL;
};

module.exports = createRequestURL;
