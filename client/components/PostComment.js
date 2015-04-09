
var React = require('react-native');
var styles = require('../styles.js');

var {View, Text, TextInput} = React;

class PostComment extends React.Component {

  render(){
    return (
    <TextInput
      editable={true}
      enablesReturnKeyAutomatically={true}
      placeholder={'Your mark...'}
      style={[styles.textInput,{marginTop:150, height:100}]}/>
    )
  }
}

module.exports = PostComment;