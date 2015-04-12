var React = require('react-native');
var styles = require('../../../styles.js');

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
      onSubmitEditing={()=>{this._submit()}}/>
    )
  }

  _submit(){
    this.props.navigator.pop();
    this._postComment();
  }

  _postComment(){

    navigator.geolocation.getCurrentPosition((location)=>{

      var commentData = {
        x: location.coords.latitude,
        y: location.coords.longitude,
        z: location.coords.altitude,
        messageId: this.props.messageId,
        commentString: this.state.input,
      }

      console.log("comment submited");
      console.log(commentData);

      fetch('http://uncovery.cloudapp.net/comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      }).then(()=>{
        console.log('should re-render comments');
        console.log(this.props)
        this.props.fetchComments();
      });
    })
  }

}

module.exports = PostComment;