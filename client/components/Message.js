
var React = require('react-native');
var Comments = require('./Comments.js');
var styles = require('../styles.js');

var {View, Text, TouchableOpacity, StyleSheet, Image,} = React;

var Message = React.createClass({

  getInitialState: function() {
    return {dir: 'row'};
  },

  render: function(body) {
    var messageString = this.props.body.messageString;
    var timestamp = this.props.body.timestamp;
    var distance = this.props.body.distance;
    var numHearts = 2

    return (
      <View style={[styles.buttonContents, {flexDirection: 'column'}]}>
        <TouchableOpacity onPress={this._onPressMessage}>
        <View>
          <Text></Text>
          <Text style={{paddingLeft: 12, paddingRight: 12, fontSize: 14}}>{messageString}</Text>
          <Text></Text>
          <Text></Text>
        </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 14, color: 'grey', flex: 2, paddingTop: 5, paddingLeft: 12,}}>{timestamp} @ {distance}</Text>
          <Text style={{fontSize: 16, paddingTop: 5, color: 'grey'}}>{numHearts}</Text>
          <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={this._heartMessage}>
              <Image
                source={heartImage}
                style={{width:30, height:30}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },

  _onPressMessage: function() {
    this.props.navigator.push({component: Comments})
  },

  _heartMessage: function(id) {
    console.log("I <3 you");

    fetch('http://uncovery.cloudapp.net/upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageId: 'mock',
        userToken: this.props.userToken,
      })
    })
  }

});

var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = Message
