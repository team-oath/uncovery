
var React = require('react-native');
var styles = require('../../../styles.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var MessageFooter = React.createClass({

  getInitialState: function(){
    return {numHearts: this.props.numHearts}
  },

  render: function(){
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.messageFooter}>{this.props.timestamp} @ {this.props.distance}</Text>
        <Text style={styles.heartCounter}>{this.state.numHearts}</Text>
          <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={this._heartMessage}>
              <Image
                source={heartImage}
                style={{width:30, height:30}}
              />
            </TouchableOpacity>
          </View>
      </View>
      );
  },

  _heartMessage: function(){
    console.log("I <3 you");
    this.setState({ numHearts: this.state.numHearts+=1 })

    fetch('http://uncovery.cloudapp.net/upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        messageId: this.props.messageId,
        userToken: this.props.userToken,
      })
    }).then(()=>{
      console.log('should re-render with new data')
      this.props.fetchMessages();
    })
  }
});

var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = MessageFooter;