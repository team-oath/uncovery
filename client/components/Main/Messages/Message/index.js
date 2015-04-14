
var React = require('react-native');
var Comments = require('../../Comments');
var Footer = require('../Footer');
var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js'); 

var { View, Text, TouchableOpacity, Image, StyleSheet, } = React;

var Message = React.createClass({

  getInitialState: function(){
    return { numHearts: this.props.message.votes }
  },

  componentWillReceiveProps: function(props){
    this.setState({ numHearts: props.message.votes })
  },

  render: function(message) {
    var {votes, messageString, image, ...footer} = this.props.message

    var thumbnail;

    if (image){
      var iurl = HOST + 'images?image='+image;
      thumbnail = <Image style={{height: 100}} source={{uri: iurl }} />
    }

    return (
      <View style={[styles.buttonContents, {flexDirection: 'column'}]}>
        <TouchableOpacity onPress={this._onPressMessage}>
          <View>
            {thumbnail}
            <Text></Text>
            <Text style={styles.messageText}>
              {messageString}
            </Text>
            <Text></Text>
            <Text></Text>
          </View>
        </TouchableOpacity>
        <Footer
          {...footer} 
          numHearts={this.state.numHearts} 
          userToken={this.props.userToken}
          updateHearts={this._updateHearts.bind(this)}
        />
        <View style={{height: 1,backgroundColor: '#f4f4f4',marginTop:10,}} />
      </View>

    );
  },

  _onPressMessage: function() {
    var {message, ...props} = this.props;
    var {votes, ...message} = this.props.message;
    var numHearts = this.state.numHearts;
    var fetchMessages = this._updateHearts.bind(this);

    this.props.navigator.push({
      component: Comments,
      passProps: Object.assign(
        {...message}, 
        {...props},
        {numHearts}, 
        {fetchMessages}),
    })
  },

  _updateHearts: function(){
    var increment = this.state.numHearts + 1;
    this.setState({numHearts: increment})
  }

});

module.exports = Message
