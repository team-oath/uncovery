
var React = require('react-native');
var Comments = require('./Comments.js');
var Footer = require('./Footer.js')
var styles = require('../styles.js');

var {View, Text, TouchableOpacity, StyleSheet, Image,} = React;

var Message = React.createClass({

  render: function(body) {

    var messageString = this.props.body.messageString;
    var timestamp = this.props.body.timestamp;
    var distance = this.props.body.distance;
    var numHearts = this.props.body.votes ? this.props.body.votes : null;

    return (
      <View style={[styles.buttonContents, {flexDirection: 'column'}]}>
        <TouchableOpacity onPress={this._onPressMessage}>
        <View>
          <Text></Text>
          <Text style={styles.messageText}>{messageString}</Text>
          <Text></Text>
          <Text></Text>
        </View>
        </TouchableOpacity>
        <Footer timestamp={distance} distance={distance} numHeartsIntial={numHearts} />
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
  },

  _heartMessage: function(id) {
    fetch('http://uncovery.cloudapp.net/upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        messageId: this.props.body.messageId,
        userToken: this.props.userToken,
      })
    }).then(()=>{
      this.props.fetchMessages();
    })
  }

});

var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = Message
