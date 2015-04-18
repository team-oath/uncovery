
var React = require('react-native');
var CameraRollView = require('../../CameraRollView.ios.js');

var styles = require('../../../styles.js'); 

var { TouchableOpacity, View, Image, } = React;

var CameraRoll = React.createClass({

  render: function() {
    return (
      <View style={{ width: require('Dimensions').get('window').width }}>
        <CameraRollView
          ref='cameraRollView'
          batchSize={4}
          groupTypes='SavedPhotos'
          renderImage={this._renderImage.bind(this)}
        />
      </View>
    );
  },

  _renderImage: function(asset) {
    return (
      <TouchableOpacity onPress={()=>{this._handleSelection(asset)}}>
          <Image
            source={asset.node.image}
            style={[styles.image, { borderWidth: 10, borderColor: 'white', alignSelf: 'center' }]}
          />
      </TouchableOpacity>
    );
  }, 

  _handleSelection: function(asset){
    this.props.route.selectImage(asset);
    this.props.navigator.pop();
  }

});

module.exports = CameraRoll;
