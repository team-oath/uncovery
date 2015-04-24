/**
 * Privy
 */

var React = require('react-native');

/* ------ Components ------- */

var AdSupportIOS = require('AdSupportIOS');
var NavigationBar = require('react-native-navbar');
var Messages = require('./components/Main/Messages');

/* ------ Modules ------- */

var io = require('./patches/socket.io-client.js');

/* ------ Configs ------- */

var styles = require('./styles.js');
var HOST = require('./config.js');

/* ------ React Destructuring Block ------- */

var { 

  AppRegistry, 
  Navigator, 
  View, 
  Text, 
  StatusBarIOS, 
  AlertIOS,
  AsyncStorage,

} = React;

/* ------ Main App ------- */

class Uncovery extends React.Component {

  constructor(){
    this.state = {
      userToken: null,
      currentPosition: null,
      socket: io('http://uncovery.cloudapp.net/',{jsonp: false}),
    }
  }

  componentWillMount(){

    var onDeviceIDSuccess = (token) => {
      console.log('Retrieved token ', token)
      this.setState({userToken: token});
      this._postUserToken(token);
    };

    var onDeviceIDFailure = () => {
      console.log('No Device ID found in local storage')
      this._getDeviceID();
    };

    // Set Status Bar White for visibility
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);

    // Initialize App State
    this._getUserLocation();
    this._getStoredDeviceID(onDeviceIDSuccess, onDeviceIDFailure);

  }
  
  render() {

    if ( !this.state.userToken || !this.state.currentPosition ) {
      return null;

    } else {
      return (
        <Navigator
          style={styles.container}
          renderScene={this.renderScene.bind(this)}
          initialRoute={{
            component: Messages,
            navigationBar: <NavigationBar backgroundColor='#C0362C'/>
          }}
          configureScene={(route) => {
            if (route.sceneConfig)
              return route.sceneConfig;
            else
              return Navigator.SceneConfigs.PushFromRight;
          }}
        />
      );
    }
  }

  renderScene(route, navigator) {

    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
      navBar = React.addons.cloneWithProps(navBar, {
        navigator: navigator,
        route: route,
        buttonsColor: 'white',
        backgroundColor: '#C0362C',
      });
    }

    return (
      <Component 
        navBar={navBar}
        navigator={navigator} 
        route={route}
        passProps = {route.passProps}
        userToken={this.state.userToken}
        currentPosition={this.state.currentPosition}
        updatePosition={this._getUserLocation}
        socket={this.state.socket}
      />
    );
  }

  _getUserLocation(){

    var watchSucess = (currentPosition) => {
      this.setState({currentPosition: currentPosition});
    }

    var watchError = (error) => {
      AlertIOS.alert(
        'Geolocation Error',
        'Please Turn on iOS Location Services'
      )
    }

    navigator.geolocation.getCurrentPosition(
      watchSucess, watchError
    );
  }

  _getStoredDeviceID(onDeviceIDSuccess, onDeviceIDFailure){
    AsyncStorage.getItem('USER_TOKEN')
      .then((token) => {
        if (token !== null) 
          onDeviceIDSuccess(token);
        else 
          onDeviceIDFailure();
      })
      .catch((error) => console.log(error))
      .done();
  }

  _storeDeviceID(deviceID){
    AsyncStorage.setItem('USER_TOKEN', deviceID)
      .then(() => console.log('Stored Device ID ', deviceID))
      .catch((error) => console.log('AsyncStorage error: ' + error.message))
      .done();
  }

  _getDeviceID(){

    var onDeviceIDSuccess = (deviceID) => {
      this._storeDeviceID(deviceID);
      this.setState({userToken: deviceID});
      this._postUserToken(deviceID).bind(this);
    }

    var onDeviceIDFailure = (e) => console.log(e);

    AdSupportIOS.getAdvertisingId(
      onDeviceIDSuccess,
      onDeviceIDFailure
    );
  }

  _postUserToken(userToken){

    var socket = this.state.socket;

    var emitToken = () => {
      socket.emit('init', {userToken: userToken});
    };

    fetch(HOST + 'usertoken', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        userToken: userToken,
      })
    })

    socket.on('connect', emitToken.bind(this));
  }

};

AppRegistry.registerComponent('uncovery', () => Uncovery);
