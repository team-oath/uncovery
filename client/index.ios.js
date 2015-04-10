/**
 * Uncovery
 */

var React = require('react-native');
var Marks = require('./components/Marks.js');
var PostForm = require('./components/PostForm.js');
var styles = require('./styles.js');

var AdSupportIOS = require('AdSupportIOS');

var { AppRegistry, NavigatorIOS, AsyncStorage, View, Text, } = React;

class Uncovery extends React.Component {

  constructor(){
    console.log(AdSupportIOS)
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
        <View style={{flex: 1}}>
          <Text>Loading messages...</Text>
        </View>
      );
    } else {
      return (
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          initialRoute={{
            title: 'Uncovery',
            rightButtonTitle: 'Mark',
            onRightButtonPress: () => {
              this.refs.nav.push({
                component: PostForm,
                title: 'Mark',
                userToken: this.state.userToken,
              });
            },
            component: Marks,
            userToken: this.state.userToken,
            currentPosition: this.state.currentPosition,
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

    var watchError = (error) => console.error(error);

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
    fetch('http://uncovery.cloudapp.net/usertoken', {
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
