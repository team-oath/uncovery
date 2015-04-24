
var React = require('react-native');
var Reactive = require('../../../../react-events.js');

var CameraRollButton = require('../../Nav/CameraRollButton.js');
var CameraRoll = require('../CameraRoll.js');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js'); 

var { 

  View, 
  Text,
  TextInput, 
  Navigator,
  AlertIOS,
  NativeModules,

} = React;

var MessageTextInput = React.createClass({

  getInitialState: function(){
    return {
      input:'',
      saved:'',
      selectedImage: '',
    };
  },

  render: function(){

    return (
      <View style={{backgroundColor: 'white',}}>
        <View style={{
          flexDirection:'row', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginRight: 10, 
          marginTop: 10,
          backgroundColor: 'white',
        }}>
          <TextInput
            style={{height: 50, padding: 10, flex: 1, backgroundColor: 'white', fontFamily: 'Avenir', fontSize: 20}}
            editable={true}
            enablesReturnKeyAutomatically={false}
            autoCorrect={false}
            returnKeyType={'send'}
            placeholder={'Be nice and make a comment...'}
            value={this.state.input}
            onSubmitEditing={this._handleSubmit.bind(this)}
            clearButtonMode='while-editing'
            onChangeText={(text) => this.setState({input: text})}
          />
          <View style={{
            flexDirection:'row', 
            alignItems: 'flex-end', 
            justifyContent: 'space-between', 
            marginBottom: 10}}
          >
            <CameraRollButton
              navToCameraRoll={this._pushForwardToCameraRoll.bind(this)}
            />
          </View>
        </View>
      <View style={styles.seperator} />
      </View> 
    )
  },

  _handleSubmit: function(){
    if (!this.state.selectedImage) {
      this._submit();
    } else {
      this._postMessageWithImage();
    }
  },

  _submit: function(image, imageWidth, imageHeight){
    var watchError = (error) => {
      console.error(error);
      AlertIOS.alert(
        'Geolocation Error',
        'Please Turn on iOS Location Services'
      )
    }

    navigator.geolocation.getCurrentPosition((currentPosition)=>{

      var data = {
         x: currentPosition.coords.latitude,
         y: currentPosition.coords.longitude,
         z: currentPosition.coords.altitude,
         message: this.state.input,
         userToken: this.props.userToken,
       }

      if ( this.state.selectedImage ) {
        data.image = image;
        data.imageW = imageWidth;
        data.imageH = imageHeight;
      }

      fetch(HOST + 'messages', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'},
         body: JSON.stringify(data),

        }).then(this._toggleState.bind(this))
          .done();

   }, watchError);

  },

  _pushForwardToCameraRoll: function(){
    var selectImage = this._selectImage.bind(this);
    this.props.navigator.push({ 
      component: CameraRoll,
      navigator: this.props.navigator,
      selectImage: this._selectImage.bind(this), 
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  },


  _postMessageWithImage: function(){
    var self = this;
    NativeModules.ReadImageData.processString(
      self.state.selectedImage.node.image.uri, 
      (image, imageWidth, imageHeight) => {
        self._submit(image, imageWidth, imageHeight);
    });
  },

  _selectImage: function(image){
    this.setState({selectedImage: image})
  },

  _toggleState: function(){
    // console.log('**************', Reactive)
    // Reactive.trigger('submit');

    this.setState({
      input:'', 
      selectedImage: null, 
    });

    this.props.toggleEdit();
    this.props.fetchMessages();

    setTimeout((()=>{
       this.props.fetchMessages()
    }).bind(this), 300);
  }

});

module.exports = MessageTextInput;
