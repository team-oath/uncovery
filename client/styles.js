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
    justifyContent: 'center',
    color: '#007AFF',
    textAlign: 'center',
  },
  textInput: {
    height: 70, 
    borderColor: 'gray', 
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  buttonContents: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    paddingVertical: 10,
  },
});

module.exports = styles;
