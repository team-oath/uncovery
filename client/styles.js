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
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
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
  }
});

module.exports = styles;
