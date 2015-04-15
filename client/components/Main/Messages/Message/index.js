
var React = require('react-native');
var Comments = require('../../Comments');
var Footer = require('../Footer');
var Thumbnail = require('../../Thumbnails');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js'); 

var { 

  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableWithoutFeedback

} = React;

var Message = React.createClass({

  getInitialState: function(){
    return { 
      numHearts: this.props.message.votes, 
      hasPressedHeart: this.props.message.voted || false,
    }
  },

  componentWillReceiveProps: function(props){
    this.setState({
      numHearts: props.message.votes,
      hasPressedHeart: this.props.message.voted || false, 
    })
  },

  render: function(message) {
    
    var {votes, messageString, image, ...footer} = this.props.message;
    var thumbnail;

    if (image){  
      thumbnail = <Thumbnail uri={image} fullResolution={false} />
    }

    return (
      <View style={[styles.buttonContents, {flexDirection: 'column'}]}>
        <TouchableWithoutFeedback onPress={this._onPressMessage}>
          <View>
            {thumbnail}
            <Text></Text>
            <Text style={styles.messageText}>
              {messageString}
            </Text>
            <Text></Text>
            <Text></Text>
          </View>
        </TouchableWithoutFeedback>
        <Footer
          {...footer}
          navToComment={this._onPressMessage.bind(this)} 
          numHearts={this.state.numHearts} 
          hasPressedHeart={this.state.hasPressedHeart}
          updateHearts={this._updateHearts.bind(this)}
        />
        <View style={styles.seperator} />
      </View>

    );
  },

  _onPressMessage: function() {

    var {message, ...props} = this.props;
    var {votes, ...message} = this.props.message;
    var numHearts = this.state.numHearts;
    var fetchMessages = this._updateHearts.bind(this);

    this.props.navigator.push({
      component: Comments,
      passProps: Object.assign(
        {...message}, 
        {...props},
        {numHearts}, 
        {fetchMessages}),
    })
  },

  _updateHearts: function(){

    if (this.state.hasPressedHeart) {
      var decrement = this.state.numHearts - 1
      this.setState({
        numHearts: decrement,
        hasPressedHeart: false,
      });
    } else {
      var increment = this.state.numHearts + 1;
      this.setState({
        numHearts: increment,
        hasPressedHeart: true,
      });
    }

    fetch(HOST + 'upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        messageId: this.props.messageId,
        userToken: this.props.userToken,
      })
    })

  }

});

module.exports = Message
