
var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({

  viewContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
  },

  userText: {
    paddingLeft: 20, 
    paddingRight: 20, 
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: '500',
    color: '#00b0ff',
  },

   recepientText: {
    paddingLeft: 20, 
    paddingRight: 20, 
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: '500',
    color: '#ff0030',
  },

  chatContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
  },

});

module.exports = styles;
