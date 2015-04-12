
var React = require('react-native');
var Comments = require('../Comments/index.js');
var Footer = require('./Footer.js')
var styles = require('../../../styles.js');

var { View, Text, TouchableOpacity, StyleSheet, } = React;

var Message = React.createClass({

  getInitialState: function(){
    return {
      numHearts: this.props.message.votes
    }
  },

  componentWillReceiveProps: function(props){
    this.setState({numHearts: props.message.votes})
  },

  render: function(message) {
    var userToken = this.props.userToken;
    var messageId = this.props.message.messageId;
    var messageString = this.props.message.messageString;
    var timestamp = this.props.message.timestamp;
    var distance = this.props.message.distance;
    var numHearts = this.state.numHearts;

    console.log(messageString, numHearts)

    return (
      <View style={[styles.buttonContents, {flexDirection: 'column'}]}>
        <TouchableOpacity onPress={this._onPressMessage}>
          <View>
            <Text></Text>
            <Text style={styles.messageText}>
              {messageString}
            </Text>
            <Text></Text>
            <Text></Text>
          </View>
        </TouchableOpacity>
        <Footer 
          userToken={userToken}
          messageId={messageId}
          timestamp={timestamp} 
          distance={distance} 
          numHearts={numHearts} 
          fetchMessages={this.props.fetchMessages}
          updateHearts={this._updateHearts.bind(this)}
        />
      </View>
    );
  },

  _onPressMessage: function() {


    this.props.navigator.push({
      component: Comments,
      passProps: {
        navigator: this.props.navigator,
        userToken: this.props.userToken,
        messageId: this.props.message.messageId,
        messageString: this.props.message.messageString,
        timestamp: this.props.message.timestamp,
        distance: this.props.message.distance,
        numHearts: this.state.numHearts,
        numComments: this.props.message.numComments,
        fetchMessages: this._updateHearts.bind(this),
      },
    })
  },

  _updateHearts: function(){
    var increment = this.state.numHearts + 1;
    this.setState({numHearts: increment})
  }

});

module.exports = Message
