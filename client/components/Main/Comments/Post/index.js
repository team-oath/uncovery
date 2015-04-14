
var React = require('react-native');
var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js')

var {View, Text, TextInput} = React;

class PostComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      input: '', 
    };
  }

  render(){
    return (
      <TextInput
        editable={true}
        enablesReturnKeyAutomatically={true}
        autoCorrect={false}
        returnKeyType={'send'}
        placeholder={'Be nice and make a comment...'}
        style={[styles.textInput,{marginTop:150}]}
        onChangeText={(text) => this.setState({input: text})}
        onSubmitEditing={()=>{this._submit()}}
      />
    );
  }

  _submit(){
    this.props.navigator.pop();
    this._postComment();
  }

  _postComment(){
    navigator.geolocation.getCurrentPosition((location)=>{

      fetch(HOST + 'comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        body: JSON.stringify({
          x: location.coords.latitude,
          y: location.coords.longitude,
          z: location.coords.altitude,
          messageId: this.props.messageId,
          commentString: this.state.input,
          userToken: this.props.userToken,
        })
      }).then(()=>{
        this.props.fetchComments();
      });
    })
  }

}

module.exports = PostComment;
