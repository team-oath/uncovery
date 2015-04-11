
var React = require('react-native');
var Comments = require('../Comments/Comments.js');
var Footer = require('./Footer.js')
var styles = require('../../../styles.js');

var {View, Text, TouchableOpacity, StyleSheet,} = React;

var Message = React.createClass({

  render: function(body) {
    var userToken = this.props.userToken;
    var messageId = this.props.body.messageId;
    var messageString = this.props.body.messageString;
    var timestamp = this.props.body.timestamp;
    var distance = this.props.body.distance;
    var numHearts = this.props.body.votes ? this.props.body.votes : null;

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
          timestamp={distance} 
          distance={distance} 
          numHeartsIntial={numHearts} 
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
        messageId: this.props.body.messageId,
        messageString: this.props.body.messageString,
        timestamp: this.props.body.timestamp,
        distance: this.props.body.distance,
        numHearts: this.props.body.votes,
        numComments: this.props.body.numComments,
        fetchMessages: this.props.fetchMessages,
      },
    })
  }
});

module.exports = Message
