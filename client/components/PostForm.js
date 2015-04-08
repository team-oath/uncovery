
var React = require('react-native');
var styles = require("../styles.js");
var config = require('../config.js');

var { View, Text, TextInput, TouchableOpacity, TouchableHighlight, CameraRoll, Image, NativeModules } = React;

var CameraRollView = require('./CameraRollView.ios');

var postFormGlobals = {};

class CameraRollExample extends React.Component {

  render() {
    return (
      <View style={styles.row}>
        <CameraRollView
          ref='cameraRollView'
          batchSize={4}
          groupTypes='SavedPhotos'
          renderImage={this._renderImage}
        />
      </View>
    );
  }

  _renderImage(asset) {
    return (
      <TouchableHighlight
        onPress={() => {
            //Set selected image & then bounce back to post form.
            postFormGlobals.selectedImage = asset;
            postFormGlobals.navigator.pop();
        }}>
          <Image
            source={asset.node.image}
            style={styles.image}
          />
      </TouchableHighlight>

    );
  }

}

class PostForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      input: '', 
      buttonText: 'Mark',
    };

    postFormGlobals.navigator = this.props.navigator;

  }

  render() {

    // Two different layouts
    // One with a preview image, one without.
    var preview;
    if (!postFormGlobals.selectedImage){
      var viewStyle = styles.previewView;
      preview = <Text style={styles.addImageButton}>Add Image</Text>
    }else{
      var viewStyle = styles.previewViewWithImage;
      preview = <View style={styles.row}><Image source={postFormGlobals.selectedImage.node.image} style={styles.previewImage} /></View>
    }

    return (
      <View style={ viewStyle }>
        
        <TouchableOpacity
            onPress={() => {
              this._pushForwardToCameraRoll()
            }}>
          { preview }
        </TouchableOpacity>

        <TextInput
          editable={true}
          enablesReturnKeyAutomatically={true}
          placeholder={'Your mark...'}
          style={styles.textInput}
          onChangeText={(text) => this.setState({input: text})}
        />
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            this._popBackToMarks();
            if (!postFormGlobals.selectedImage){
              this._postMessage(this.state.input);
            }else{
              this._postMessageWithImage(this.state.input);
            }
          }
        }>
          <Text style={styles.button}>
            {this.state.buttonText}
          </Text>  
        </TouchableOpacity>
      </View>
    );
  }

  _popBackToMarks() {
    this.props.navigator.pop();
  }

  _pushForwardToCameraRoll() {
    this.props.navigator.push({ component: CameraRollExample });
  }

  _postMessageWithImage(input){
    var self = this;
    NativeModules.ReadImageData.processString(postFormGlobals.selectedImage.node.image.uri, (image) => {
      this._postMessage(input, image);
    });
  }

  _postMessage(input, image) {
    
    var postMessage = (currentPosition) => {

      var data = {}
      data.x = currentPosition.coords.latitude;
      data.y = currentPosition.coords.longitude;
      data.z = currentPosition.coords.altitude
      data.message = input;
      data.userToken = this.props.route.userToken;

      if (image){
        // Optional image
        data.image = image;
      }

      data = JSON.stringify(data);

      delete postFormGlobals.selectedImage;

      fetch(config.host, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: data,
      });


    }
    
    navigator.geolocation.getCurrentPosition(postMessage);
    
  }

};

module.exports = PostForm;
