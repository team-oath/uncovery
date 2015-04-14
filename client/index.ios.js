/**
 * Uncovery
 */

var React = require('react-native');
var Reactive = require('./react-events.js')();
var AdSupportIOS = require('AdSupportIOS');

var Messages = require('./components/Main/Messages');
var PostMessage = require('./components/Main/Messages/PostMessage.js');
var styles = require('./styles.js');
var HOST = require('./config.js')

var { AppRegistry, NavigatorIOS, View, Text, } = React;

class Uncovery extends React.Component {

  constructor(){
    this.state = {
      userToken: null,
      currentPosition: null,
    }
  }

  componentWillMount(){
    this._getUserLocation();
    this._getDeviceID();
  }
  
  render() {
    if (!this.state.userToken || !this.state.currentPosition){
      return (
        <View style={{marginTop: 200, flex: 1}}>
          <Text>Loading messages...</Text>
        </View>
      );
    } else {
      return (
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          barTintColor= '#C0362C'
          titleTextColor = '#FFFFFF'
          initialRoute={{
            title: 'Uncovery',
            titleTextColor:'#FFFFFF',
            rightButtonTitle: '+  ',
            onRightButtonPress: () => {
              this.refs.nav.push({
                component: PostMessage,
                title: 'Share',
                passProps: {userToken: this.state.userToken},
              });
            },
            component: Messages,
            passProps: {
              userToken: this.state.userToken,
              currentPosition: this.state.currentPosition,
            },
          }}
          itemWrapperStyle={styles.itemWrapper}
          tintColor='#008888'
        />
      );
    }
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
      console.log('********** SUCCESS *********');
      console.log(deviceID);
      this.setState({userToken: deviceID});
      this._postUserToken(deviceID);
    }

    var onDeviceIDFailure = (e)=>{
      console.log('********** FAILURE *********');
      console.log(e);
    }

    AdSupportIOS.getAdvertisingId(
      onDeviceIDSuccess,
      onDeviceIDFailure
    );
  }

  _postUserToken(userToken){
    console.log('sent User Token to server');
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
