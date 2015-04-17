
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

  getInitialState: function() {
    return { 
      numHearts: this.props.message.votes, 
      hasPressedHeart: this.props.message.voted,
      load: false,
    }
  },

  componentWillReceiveProps: function(){

    if (!this.state.load){
      this.setState({
        numHearts: this.props.message.votes, 
        hasPressedHeart: this.props.message.voted,
      })

    } else { this.setState({load:false})}
    
  },


  render: function(message) {

    var {

      votes, 
      voted, 
      messageString, 
      image, 
      ...footer

    } = this.props.message;

    return (
      <View style={[styles.buttonContents, {flexDirection: 'column'}]}>
        <TouchableWithoutFeedback onPress={this._onPressMessage}>
          <View>
            <Text style={[styles.messageText, {marginTop: 10}]}>
              {messageString}
            </Text>
            <Text></Text>
            <Thumbnail 
              uri={image} 
              fullResolution={false}
            />
            <Text></Text>
          </View>
        </TouchableWithoutFeedback>
        <Footer
          {...footer}
          navToComment={this._onPressMessage} 
          numHearts={this.state.numHearts}
          hasPressedHeart={this.state.hasPressedHeart}
          updateHearts={this._updateHearts}
        />
        <View style={styles.seperator} />
      </View>

    );
  },

  _onPressMessage: function() {

    var {message, ...props} = this.props;
    var {votes, ...message} = this.props.message;
    var hasPressedHeart = this.state.hasPressedHeart;
    var numHearts = this.state.numHearts;
    var fetchMessages = this._updateHearts;

    this.props.navigator.push({
      component: Comments,
      passProps: Object.assign(
        {...message}, 
        {...props},
        {numHearts}, 
        {hasPressedHeart},
        {fetchMessages}),
    })
  },

  _updateHearts: function(){
    
    if (this.state.hasPressedHeart) {
      var decrement = this.state.numHearts - 1
      this.setState({
        numHearts: decrement,
        hasPressedHeart: false,
        load:true,
      });

    } else {
      var increment = this.state.numHearts + 1;
      this.setState({
        numHearts: increment,
        hasPressedHeart: true,
        load:true,
      });
    }

    fetch(`${HOST}upvote`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        messageId: this.props.message.messageId,
        userToken: this.props.userToken,
      })
    }).then(()=>{
      this.props.fetchMessages();
    })

  }

});

module.exports = Message
