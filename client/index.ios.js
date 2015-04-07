/**
 * Uncovery
 */

var React = require('react-native');
var Marks = require("./components/Marks.js");
var PostForm = require("./components/PostForm.js");
var styles = require("./styles.js");
// var shortid = require("crypto");

var { AppRegistry, NavigatorIOS, AsyncStorage, } = React;

var USERID;

class Uncovery extends React.Component {

  componentWillMount() {

    var getUserId = function(callback){
      fetch('http://localhost:9090/userid')
        .then((response) => response.json())
        .then((responseData) => {
          callback(responseData.id)
        })
        .done();
    };

    var storeUserId = function(id){
      AsyncStorage.setItem('USERID', id, (error, value) => {
        if (error){
          console.log('AsyncStorage error: ' + error.message);
        } else {
          console.log("Saved USERID to disk");
        }
      });
    };

    AsyncStorage.getItem('USERID', (error, value) => {
      if (error) {
        console.log('AsyncStorage error: ' + error.message);
      } else if (value !== null) {
        console.log('Recovered selection from disk: ' + value);
      } else {
        console.log('Initialized with no selection on disk.');
        getUserId(storeUserId);
      }
    });
  }

  render() {
    var self = this;
    console.log('this is ', this)
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
            });
          },
          component: Marks,
        }}
        itemWrapperStyle={styles.itemWrapper}
        tintColor='#008888'
      />
    );
  }
};

AppRegistry.registerComponent('uncovery', () => Uncovery);
