var React = require('react-native');

var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingTop: 0,
    paddingRight: 10,
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    borderRadius: 8,
  },
  button: {
    color: '#007AFF',
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
});

module.exports = styles;
