
var React = require('react-native');
var styles = require('./styles.js');

var { TextInput } = React;

class ChatTextInput extends React.Component {

  constructor(){
    this.state = {
      input: '', 
      saved: '',
    };
  }

  render(){
    return (
      <TextInput
        style={styles.chatList}
        editable={true}
        enablesReturnKeyAutomatically={false}
        autoCorrect={false}
        returnKeyType={'send'}
        placeholder={'Have fun, make a connection...'}
        value={this.state.input}
        onEndEditing={this.props.editOff}
        onSubmitEditing={this._submit.bind(this)}
        clearButtonMode='while-editing'
        onFocus={this.props.editOn}
        onChangeText={(text) => {
          this.setState({input: text, saved: text})
        }}
      />
      );
  }

  _submit(){
    this.props.editOff()
    this.setState({input: ''});
    this._postChatMessage();
  }

  _postChatMessage(){
    this.props.socket.emit('pmContent', {
      sessionId: this.props.sessionId, 
      content: this.state.saved
    });

    this.setState({saved: ''});
  }

};

module.exports = ChatTextInput;
