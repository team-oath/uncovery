
var React = require('react-native');
var styles = require('../../../styles.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var Footer = React.createClass({

  render: function() {

    return(
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.messageFooter}>{this.props.timestamp} @ {this.props.distance}</Text>
        <Text style={styles.heartCounter}>{this.props.numHeartsIntial}</Text>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={this._heartMessage}>
            <Image
              source={heartImage}
              style={{width:30, height:30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  },

  _heartMessage: function() {

    this.props.updateHearts();

    fetch('http://uncovery.cloudapp.net/upvote', {
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

var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = Footer;
