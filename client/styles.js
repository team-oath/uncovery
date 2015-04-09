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
    borderColor: '#B0C4DE', 
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  buttonContents: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginVertical: 1,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    paddingVertical: 10,
  },
  row: {
    flex: 1,
  },
  image: {
    width: 177,
    height: 177,
    margin: 5,
    justifyContent: 'center',
  },
  addImageButton: {
    textAlign: 'center',
    bottom: 20,
  },
  previewView: {
    top: 100,
    padding:20,
    justifyContent: 'center',
  },
  previewViewWithImage: {
    top: 45,
    padding:20,
    justifyContent: 'center',
  },
  previewImage: {
    width: 150,
    height: 150,
    margin: 10,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  text: {
    flex: 1,
  },
  messageText: {
    paddingLeft: 12, 
    paddingRight: 12, 
    fontSize: 14,
  },
  commentText: {
    paddingLeft: 45, 
    paddingRight: 12, 
    fontSize: 14,
  },
  messageFooter: {
    fontSize: 14, 
    color: 'grey', 
    flex: 2, 
    paddingTop: 5, 
    paddingLeft: 12,
  },
  commentFooter: {
    fontSize: 14, 
    color: 'grey', 
    flex: 2, 
    paddingTop: 5, 
    paddingLeft: 45,
  },
  commentHeaderButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0C4DE',
    flexDirection: 'row',
  },
  heartCounter: {
    fontSize: 16, 
    paddingTop: 5, 
    color: 'grey',
  }
});

module.exports = styles;
