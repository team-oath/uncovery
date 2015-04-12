
var React = require('react-native');
var Comments = require('../Comments/index.js');
var Footer = require('./Footer.js')
var styles = require('../../../styles.js');

var { View, Text, TouchableOpacity, StyleSheet, } = React;

var Message = React.createClass({

  getIntialState: function(){
    return {numHearts: this.props.body.votes}
  },

  render: function(body) {
    var userToken = this.props.userToken;
    var messageId = this.props.body.messageId;
    var messageString = this.props.body.messageString;
    var timestamp = this.props.body.timestamp;
    var distance = this.props.body.distance;
    var numHearts = this.props.body.votes ? this.props.body.votes : null;

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
          numHeartsIntial={numHearts} 
          updateHearts={this._updateHearts}
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
  },

  _updateHearts: function(){
    var increment = this.props.body.votes ? this.props.body.votes+=1 : 1;
    this.props.body.votes = increment;
    this.setState({numHearts: this.props.body.votes})
  }

});

module.exports = Message