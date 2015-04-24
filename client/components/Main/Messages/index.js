var React = require('react-native');

/* ------ Components ------- */

var Message = require('./Message');
var CameraRoll = require('./CameraRoll.js');
var MessageStreamSwitcher = require('../Nav/MessageStreamSwitcher.js');
var MessageTextInputButton = require('../Nav/MessageTextInputButton.js');
var NumHeartsDisplay = require('../Nav/NumHeartsDisplay.js');
var CameraRollButton = require('../Nav/CameraRollButton.js');
var Camera = require('./Camera.js');
var ActionSheetIOS = require('ActionSheetIOS');
var imageButtons = ['From Camera','Photo Library','Cancel'];
var React = require('react-native');

/* ------ Configs ------- */

var HOST = require('../../../config.js');
var styles = require('../../../styles.js'); 

/* ------ React Components ------- */

var {

  View, 
  ListView, 
  Text, 
  ActivityIndicatorIOS, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  NativeModules,
  Navigator,
  AlertIOS,

} = React;

/* ------ Main Component ------- */

class Messages extends React.Component {

  constructor(props) {
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      reloading: false,
      coords: null,
      input: '',
      selectedImage: null,
      edit: false,
      imageData: null,
      userHasSelectAnImage: false,
    };

    this.displayName = "Messages"
  }

  componentDidMount() {
    this.fetchMessages();

    // Custom Navbar for Message Component
    if (this.props.navBar) {
      this.props.navBar = React.addons.cloneWithProps(this.props.navBar, {
        customNext: <MessageTextInputButton show={this._toggleEdit.bind(this)} />,
        customPrev: <NumHeartsDisplay userToken={this.props.userToken}/>,
      });
    }
  }

  render() {

    if ( !this.state.loaded || !this.props.userToken ) return null

    return (
      <View>
        {this.props.navBar}
        {this.state.edit ? 
        <View style={{backgroundColor: 'white',}}>
        <View style={{
          flexDirection:'row', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginRight: 10, 
          marginTop: 10,
          backgroundColor: 'white', }}
        >
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
              navToCameraRoll={this._showImageOptions.bind(this)}
              userHasSelectAnImage={this.state.userHasSelectAnImage}
            />
          </View>
          </View>
          <View style={styles.seperator} />
        </View> : null }
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMessage.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{backgroundColor: 'white', height: require('Dimensions').get('window').height-62,}}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000} 
          onScroll={this._handleScroll.bind(this)}
        />
      </View>
      );
  }

  _toggleEdit(){
    this.setState({edit: this.state.edit ? false : true});
  }

  _handleSubmit(){
    if (!this.state.userHasSelectAnImage) {
      this._submit();
    } else {
      this._postMessageWithImage();
    }
  }

  _postMessageWithImage(){
    var self = this;
    
    var dimensions = require('Dimensions').get('window');

    if (this.state.cameraPhoto){
      this._submit(this.state.imageData, 375, 500);
    }else{
      NativeModules.ReadImageData.processString(
        self.state.selectedImage.node.image.uri, 
        (image, imageWidth, imageHeight) => {
          self._submit(image, imageWidth, imageHeight);
      });
    }
  }

  _submit(image, imageWidth, imageHeight){

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

      if ( this.state.userHasSelectAnImage ) {
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

      }).then(()=> {
        
        this.setState({
          input:'', 
          selectedImage: null, 
          edit: false,
          userHasSelectAnImage: false,
        });
        
        this.fetchMessages();

      }).done();

   }, watchError);

  }

  _selectImage(image){
    this.setState({ cameraPhoto: false });
    this.setState({ selectedImage: image });
    this.setState({ userHasSelectAnImage: true });
  }

  _takePhoto(data){
    // The photo is returned as base64 data.
    // We don't need to encode again on submission.
    this.setState({ cameraPhoto: true });
    this.setState({ imageData: data });
    this.setState({ userHasSelectAnImage: true });
  }

  _pushForwardToCameraRoll() {
    var selectImage = this._selectImage.bind(this);
    this.props.navigator.push({ 
      component: CameraRoll,
      navigator: this.props.navigator,
      selectImage: this._selectImage.bind(this), 
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

  _pushForwardToCamera() {
    this.props.navigator.push({ 
      component: Camera,
      navigator: this.props.navigator,
      takePhoto: this._takePhoto.bind(this), 
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

  _showImageOptions() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: imageButtons,
      cancelButtonIndex: imageButtons.length-1
    },
    (buttonIndex) => {
      if (buttonIndex === 0){ //Camera
        this._pushForwardToCamera();
      }else if(buttonIndex === 1){ //Library
        this._pushForwardToCameraRoll();
      }
    });
  }

  renderMessage(message) {
    return (
      <Message 
        message={message} 
        userToken={this.props.userToken} 
        navigator={this.props.navigator} 
        fetchMessages={this.fetchMessages.bind(this)}
        coords={this.state.coords}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={{flex: 1}}>
        <Text>
          Loading messages...
        </Text>
      </View>
    );
  }

  renderHeader(){
    if (this.state.reloading) {
      return (
        <View style={styles.loadingHeader}>
          <ActivityIndicatorIOS 
            animating={true}
            style={{alignItems:'center',justifyContent: 'center'}}
            size="large" 
          />
        </View>
      )
    }
    return null;
  }

  fetchMessages(loading){

    var route = 'messages/'

    var x = this.props.currentPosition.coords.latitude;
    var y = this.props.currentPosition.coords.longitude;
    var z = this.props.currentPosition.coords.altitude;
    var userToken = this.props.userToken;
    
    var params = `?x=${x}&y=${y}&z=${z}&userToken=${userToken}`
    
    var watchOptions = {enableHighAccuracy: true};
    var watchSucess;

    if (loading) {
      watchSucess = (currentPosition) => {
        this.setState({reloading: true})
        fetch(`${HOST}${route}${params}`)
          .then((response) => {
            return response.json()
          })
          .then((responseData) => {
            setTimeout(()=>{
              this.willReload = false;
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                loaded: true,
                reloading: false,
                coords: currentPosition.coords,
              })
            }, 300)
           
          })
          .catch((e)=>{console.log(e)})
          .done();
      }
    } else {
      watchSucess = (currentPosition) => {
        
        fetch(`${HOST}${route}${params}`)
          .then((response) => {
            return response.json()
          })
          .then((responseData) => {
              this.willReload = false;
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                loaded: true,
                reloading: false,
                coords: currentPosition.coords,
              })
          })
          .catch((e)=>{console.log(e)})
          .done();
      }

    }

    var watchError = (error) => console.error(error);

    if (this.willReload || this.state.reloading) return

    this.willReload = true;

    navigator.geolocation.getCurrentPosition(
      watchSucess, watchError, watchOptions
    );
  }

  _handleScroll(event){
    var pullDown = event.nativeEvent.contentOffset.y < -100;
    if ( pullDown ){
      this.fetchMessages('loading');
    } 
    this.props.onScroll && this.props.onScroll(e)
  }

};

module.exports = Messages;