
var React = require('react-native');

var Comments = require('../../Comments');
var FullHeart = require('../../Hearts/Full');
var EmptyHeart = require('../../Hearts/Empty');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js')

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var MessageFooter = React.createClass({

  // getInitialState: function(){
  //   return {
  //     numHearts: this.props.numHearts,
  //     hasPressedHeart: this.props.hasPressedHeart,
  //   }
  // },

  // componentWillReceiveProps: function(props){
  //   this.setState({
  //     numHearts: props.numHearts,
  //     hasPressedHeart: props.hasPressedHeart,
  //   })
  // },

  render: function(){
    // console.log(this.state.hasPressedHeart,'*************')
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
              {this.props.numHearts? this.props.numHearts : null}
            </Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={this._heartMessage}>
              <View>
              {this.props.hasPressedHeart ? <FullHeart/> : <EmptyHeart/>}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      );
  },

  _heartMessage: function(){

    // if ( this.state.hasPressedHeart ){
    //   var decrement = this.state.numHearts - 1;
    //   this.setState({
    //     numHearts: decrement,
    //     hasPressedHeart: false,
    //   })
    // } else {
    //   var increment = this.state.numHearts + 1;
    //   this.setState({
    //     numHearts: increment,
    //     hasPressedHeart: true,
    //   })
    // }

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
      // this.props.fetchMessages()
    })

  }
});

var heartImage = {uri: 'http://i.imgur.com/97rSbCf.png?1'};
var heartFilled = {uri: 'http://i.imgur.com/SXHb8nG.png?1'};

module.exports = MessageFooter;
