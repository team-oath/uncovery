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
    this.state = {userid:null}
  }

  componentWillMount(){
    this._getStoredUserId();
  }
  
  render() {
    if (!this.state.userid){
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
                userid: this.state.userid,
              });
            },
            component: Marks,
            userid: this.state.userid,
          }}
          itemWrapperStyle={styles.itemWrapper}
          tintColor='#008888'
        />
      );
    }
  }

  _getStoredUserId(){

    var self = this;

    var getUserId = function(callback){
      fetch('http://uncovery.cloudapp.net/userid')
        .then((response) => response.json())
        .then((responseData) => {
          callback(responseData.id)
        })
        .done();
    };

    var storeUserId = function(id){
      AsyncStorage.setItem('USERID', id, (error) => {
        if (error){
          console.log('AsyncStorage error: ' + error.message);
        } else {
          console.log("werer Saved USERID to disk");
          self.setState({userid:id});
          console.log("THE STATE IS ", self.state)
        }
      });
    };

    AsyncStorage.getItem('USERID', (error, id) => {
      if (error) {
        console.log('AsyncStorage error: ' + error.message);
      } else if (id !== null) {
        self.setState({userid: id})
      } else {
        getUserId(storeUserId);
      }
    });
  }
};

AppRegistry.registerComponent('uncovery', () => Uncovery);
