
var React = require('react-native');
var styles = require('../styles.js');

var {View, Text, TextInput} = React;

class Comments extends React.Component {

  render(){
    return (
      <TextInput
        editable={true}
        enablesReturnKeyAutomatically={true}
        placeholder={'Your mark...'}
        style={styles.textInput}
        onChangeText={(text) => this.setState({input: text})}
      />
    )
  }

}

module.exports = Comments;