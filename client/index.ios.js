/**
 * Uncovery
 */

var React = require('react-native');
var Marks = require('./components/Marks.js');
var PostForm = require('./components/PostForm.js');
var styles = require('./styles.js');
// var config = require('./config.js');

var { AppRegistry, NavigatorIOS, AsyncStorage, View, Text, } = React;

class Uncovery extends React.Component {

  constructor(){
    this.state = {userToken: null}
  }

  componentWillMount(){
    this._getStoredUserId();
  }
  
  render() {
    if (!this.state.userToken){
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
          }}
          itemWrapperStyle={styles.itemWrapper}
          tintColor='#008888'
        />
      );
    }
  }

  _getStoredUserId(){

    var self = this;

    var getUserToken = function(callback){
      fetch('http://uncovery.cloudapp.net/usertoken')
        .then((response) => response.json())
        .then((responseData) => {
          callback(responseData.userToken)
        })
        .done();
    };

    var storeUserToken = function(token){
      AsyncStorage.setItem('USER_TOKEN', token, (error) => {
        if (error){
          console.log('AsyncStorage error: ' + error.message);
        } else {
          console.log("werer Saved USERID to disk");
          self.setState({userToken: token});
        }
      });
    };

    AsyncStorage.getItem('USER_TOKEN', (error, token) => {
      if (error) {
        console.log('AsyncStorage error: ' + error.message);
      } else if (token !== null) {
        self.setState({userToken: token})
      } else {
        getUserToken(storeUserToken);
      }
    });
  }
};

AppRegistry.registerComponent('uncovery', () => Uncovery);
