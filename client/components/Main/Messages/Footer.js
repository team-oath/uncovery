
var React = require('react-native');
var styles = require('../../../styles.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var Footer = React.createClass({

  // TODO change logic heartPressed initial state
    // if this.props.upvoted is true, then set to true

  getInitialState: function(){
    return {heartPressed: false}
  },

  render: function() {
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <View style={styles.messageFooter}>
          <Text>{this.props.timestamp} @ {this.props.distance}</Text>
        </View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={styles.heartCounter}>
            <Text>
              {this.props.numHearts ? this.props.numHearts : null}
            </Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={this._heartMessage}>
            { this.state.heartPressed ? 
              <Image
                source={heartFilled}
                style={{width:30, height:30}}
              />
              :
              <Image
                source={heartImage}
                style={{width:30, height:30}}
              />
            }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  },

  _heartMessage: function() {

      this.setState({
        heartPressed: this.state.heartPressed ? false: true
      })

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
var heartFilled = {uri: 'http://i.imgur.com/6aglIdZ.png?1'}

module.exports = Footer;
