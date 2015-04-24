
var React = require('react-native');

var styles = require('../../../styles.js'); 

var { TouchableOpacity, TouchableOpacity, View, StatusBarIOS, Image } = React;

var Camera = require('react-native-camera');

var CameraView = React.createClass({

  render: function() {
    var dimensions = require('Dimensions').get('window');

    this._hideStatusBar();

    return (
      <View>
        <View>
          <Camera
            ref="cam"
            aspect="Fill"
            type="Back"
            orientation="Portrait"
            style={{height: dimensions.height, width: dimensions.width}}
          >
            <TouchableOpacity onPress={this._switchCamera}>
              <Image style={{ top: 20, alignSelf: 'flex-end', right: 20, width:30, height: 30 }} source={{ uri: 'http://i.imgur.com/1Mo4sCM.png' }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={this._takePicture}>
              <Image style={{ top: dimensions.height-150, alignSelf: 'center', width:60, height: 60 }} source={{ uri: 'http://i.imgur.com/OSFbd2l.png' }} />
            </TouchableOpacity>
            
          </Camera>
        </View>
      </View>
    );
  },

  _hideStatusBar: function(){
    {Object.keys(StatusBarIOS.Animation).map((key) =>
      StatusBarIOS.setHidden(true, StatusBarIOS.Animation[key])
    )}
  },

  _showStatusBar: function(){
    {Object.keys(StatusBarIOS.Animation).map((key) =>
      StatusBarIOS.setHidden(false, StatusBarIOS.Animation[key])
    )}
  },

  _switchCamera: function() {
    this.refs.cam.switch();
  },

  _takePicture: function(){
    var self = this;
    this.refs.cam.takePicture(function(err, data){
      self._showStatusBar();
      self.props.route.takePhoto(data);
      self.props.navigator.pop();
    });
  }

});

module.exports = CameraView;
