
var React = require('react-native');
var Comments = require('../Comments/index.js');
var Footer = require('./Footer.js')
var styles = require('../../../styles.js');

var { View, Text, TouchableOpacity, StyleSheet, } = React;

var Message = React.createClass({

  getInitialState: function(){
    return {
      numHearts: this.props.body.votes
    }
  },

  componentWillReceiveProps: function(props){
    console.log(props, '*************')
    this.setState({numHearts: props.body.votes})
  },

  render: function(body) {
    var userToken = this.props.userToken;
    var messageId = this.props.body.messageId;
    var messageString = this.props.body.messageString;
    var timestamp = this.props.body.timestamp;
    var distance = this.props.body.distance;
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
        messageId: this.props.body.messageId,
        messageString: this.props.body.messageString,
        timestamp: this.props.body.timestamp,
        distance: this.props.body.distance,
        numHearts: this.state.numHearts,
        numComments: this.props.body.numComments,
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
