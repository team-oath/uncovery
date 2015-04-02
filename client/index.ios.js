/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
  ListView,
  SwitchIOS,
  Text,
  TextInput
} = React;

var styles = require("./styles.js");
var Marks = require("./components/marks.js");
var postForm = require("./components/post-form.js");

var uncovery = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={{
          title: 'UIExplorer :)',
          rightButtonTitle: 'Mark',
          onRightButtonPress: () => {
            this.refs.nav.push({
              component: postForm,
              title: 'sdf'
            });
          },
          component: Marks
        }}
        itemWrapperStyle={styles.itemWrapper}
        tintColor='#008888'
      />
    );
  },

});

AppRegistry.registerComponent('uncovery', () => uncovery);
