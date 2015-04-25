var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({

  chatColor: {
    backgroundColor: '#ffcf00',
  },

  chatsContainer: {
    backgroundColor: 'white', 
    height: require('Dimensions').get('window').height-62,
  },
  
  chatContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 30, 
    marginBottom: 30,
  },

  chatText: {
    fontSize: 30, 
    fontFamily: 'Avenir', 
    color: 'white',
  },

  separator: {
    height: 2,
    backgroundColor: 'white',
  },

});

module.exports = styles;
