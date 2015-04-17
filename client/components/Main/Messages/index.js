
var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Message = require('./Message');
var Menu = require('../../Menu');
var CameraRollView = require('../../CameraRollView.ios.js');

var HOST = require('../../../config.js');
var styles = require('../../../styles.js'); 

var { View, ListView, Text, ActivityIndicatorIOS, TextInput, TouchableOpacity, Image, } = React;

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
      <TouchableOpacity>
          <Image
            source={asset.node.image}
            style={styles.image}
          />
      </TouchableOpacity>
    );
  }

}

class Messages extends React.Component {

  constructor(props) {
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          return JSON.stringify(row1) !== JSON.stringify(row2)
        },
      }),
      loaded: false,
      reloading: false,
      coords: null,
      input: '',
      image: null, 
    };

    this.displayName = "Messages"
  }

  componentDidMount() {
    this.fetchMessages();
    Reactive.on('posted', (()=>{
      this.fetchMessages('loading');
    }).bind(this) );
  }

  render() {

    // console.log('********************')
    // console.log({...this.props})

    if ( !this.state.loaded || !this.props.userToken ) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <View style={{justifyContent: 'space-between', display: 'flex', alignItems: 'flex-end'}}>
          <TextInput
            style={{marginTop: 100, height: 50, padding: 5}}
            editable={true}
            enablesReturnKeyAutomatically={false}
            autoCorrect={false}
            returnKeyType={'send'}
            placeholder={'Be nice and make a comment...'}
            value={this.state.input}
            onSubmitEditing={this._submit.bind(this)}
            clearButtonMode='while-editing'
            onChangeText={(text) => {
              this.setState({input: text, saved: text})
            }}
          />
          <View>
            <TouchableOpacity onPress={this._pushForwardToCameraRoll.bind(this)}>
              <Text>
                Camera
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMessage.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{backgroundColor: '#D7E1EE', height: 520}}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000} 
          onScroll={this._handleScroll.bind(this)}
        />
      </View>
      );
  }

  _submit(){

   navigator.geolocation.getCurrentPosition((currentPosition)=>{

     var data = {
       x: currentPosition.coords.latitude,
       y: currentPosition.coords.longitude,
       z: currentPosition.coords.altitude,
       message: this.state.input,
       userToken: this.props.userToken,
     }

     fetch(HOST + 'messages', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'},
       body: JSON.stringify(data),
     }).then(()=> this.setState({input:''}))

   });


  }

  _setImage(){


  };

  _pushForwardToCameraRoll() {
    this.props.navigator.push({ component: CameraRollExample });
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
