/**
 * Uncovery
 */

var React = require('react-native');
var Marks = require("./components/Marks.js");
var PostForm = require("./components/PostForm.js");
var styles = require("./styles.js");
// var shortid = require("crypto");

var { AppRegistry, NavigatorIOS } = React;

class Uncovery extends React.Component {

  render() {
    // console.log(shortid.generate());
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
