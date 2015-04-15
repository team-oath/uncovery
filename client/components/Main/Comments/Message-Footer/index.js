
var React = require('react-native');
var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js')

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var MessageFooter = React.createClass({

  getInitialState: function(){

    return {
      numHearts: this.props.numHearts,
      hasPressedHeart: this.props.hasPressedHeart,
    }
  },

  render: function(){
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <View>
          <Text style={styles.messageFooter}>
            {this.props.distance}, {this.props.timestamp}
          </Text>
        </View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View>
            <Text style={styles.heartCounter}>
              {this.state.numHearts}
            </Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={this._heartMessage}>
            {this.state.heartPressed ? 
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
      );
  },

  _heartMessage: function(){
    this.setState({
      numHearts: this.state.numHearts+1,
      hasPressedHeart: this.state.heartPressed ? false : true,
    })

    fetch(HOST + 'upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        messageId: this.props.messageId,
        userToken: this.props.userToken,
      })
    }).then(()=>{
      this.props.fetchMessages();
    })
  }
});

// var heartImage = {uri: 'http://i.imgur.com/SXHb8nG.png?1'};
// var heartFilled = {uri: 'http://i.imgur.com/6aglIdZ.png?1'};

var heartImage = {uri: 'http://i.imgur.com/97rSbCf.png?1'};
var heartFilled = {uri: 'http://i.imgur.com/SXHb8nG.png?1'};

module.exports = MessageFooter;
