/**
 * Uncovery
 */

var React = require('react-native');
var styles = require("./styles.js");
var Marks = require("./components/marks.js");
var postForm = require("./components/post-form.js");

var { AppRegistry, NavigatorIOS } = React;

class Uncovery extends React.Component {

  render() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={{
          title: 'Uncovery',
          rightButtonTitle: 'Mark',
          onRightButtonPress: () => {
            this.refs.nav.push({
              component: postForm,
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
