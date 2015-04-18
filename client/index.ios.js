/**
 * Uncovery
 */

var React = require('react-native');
var Reactive = require('./react-events.js')();
var AdSupportIOS = require('AdSupportIOS');
var NavigationBar = require('react-native-navbar');

var Messages = require('./components/Main/Messages');
var PostMessage = require('./components/Main/Messages/Post');
var styles = require('./styles.js');
var HOST = require('./config.js')

// var WebViewExample = require('./components/Main/webview-test.js')

var { AppRegistry, Navigator, View, Text, StatusBarIOS, } = React;

class Uncovery extends React.Component {

  constructor(){
    this.state = {
      userToken: null,
      currentPosition: null,
    }
  }

  componentWillMount(){
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);
    this._getUserLocation();
    this._getDeviceID();
  }

    renderScene(route, navigator) {
      var Component = route.component;
      var navBar = route.navigationBar;

      if (navBar) {
        navBar = React.addons.cloneWithProps(navBar, {
          navigator: navigator,
          route: route,
        });
      }


      return (
        <View style={styles.navigator}>
          
          <Component 
            navBar={navBar}
            navigator={navigator} 
            route={route}
            passProps = {route.passProps}
            userToken={this.state.userToken}
            currentPosition={this.state.currentPosition}
            />
        </View>
      );
    }
  
  render() {

    if ( !this.state.userToken || !this.state.currentPosition ) return null;
  
    else return (

      <Navigator
        style={styles.container}
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          component: Messages,
          navigationBar: <NavigationBar backgroundColor='#C0362C'/>
        }}
        configureScene={(route) => {
          if (route.sceneConfig) return route.sceneConfig;
          else return Navigator.SceneConfigs.PushFromRight;
        }}
      />

    );
   
   }

  _getUserLocation(){
    var watchSucess = (currentPosition) => {
      this.setState({currentPosition: currentPosition});
    }

    var watchError = (error) => {console.error(error);}

    navigator.geolocation.getCurrentPosition(
      watchSucess, watchError
    );
  }

  _getDeviceID(){
    var onDeviceIDSuccess = (deviceID)=>{
      this.setState({userToken: deviceID});
      this._postUserToken(deviceID);
    }

    var onDeviceIDFailure = (e)=>{
      console.log(e);
    }

    AdSupportIOS.getAdvertisingId(
      onDeviceIDSuccess,
      onDeviceIDFailure
    );
  }

  _postUserToken(userToken){
    fetch(HOST + 'usertoken', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        userToken: userToken,
      })
    })
  }

};

AppRegistry.registerComponent('uncovery', () => Uncovery);

