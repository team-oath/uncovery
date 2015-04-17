
var React = require('react-native');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var CommentFooter = React.createClass({

  getInitialState: function(){
    return {
      numHearts: this.props.numHearts,
      heartPressed: false,
    }
  },

  render: function(){
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <View>
          <Text style={styles.commentFooter}>
            {this.props.distance}, {this.props.timestamp}
          </Text>
        </View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View>
            <Text style={[styles.heartCounter,{fontSize: 12}]}>
              {this.state.numHearts}
            </Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={this._heartComment}>
            { this.state.heartPressed ? 
              <Image
                source={heartFilled}
                style={{width:20, height:20, marginRight: 4, marginTop: 5}}
              />
              :
              <Image
                source={heartImage}
                style={{width:20, height:20, marginRight: 4, marginTop: 5}}
              />
            }    
            </TouchableOpacity>
          </View>
        </View>
      </View>
      );
  },

  _heartComment: function(){
    this.setState({
      numHearts: this.state.numHearts + 1,
      heartPressed: this.state.heartPressed ? false : true,
    })

    fetch(HOST + 'upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        commentId: this.props.commentId,
        userToken: this.props.userToken,
      })
    })
  }

});

var heartImage = {uri: 'http://i.imgur.com/97rSbCf.png?1'};
var heartFilled = {uri: 'http://i.imgur.com/SXHb8nG.png?1'};

module.exports = CommentFooter;
