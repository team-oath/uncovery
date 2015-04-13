
var React = require('react-native');
var styles = require('../../../styles.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var CommentFooter = React.createClass({

  render: function(){
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.commentFooter}>{this.props.timestamp} @ {this.props.distance}</Text>
        <Text style={{marginBottom: 15}}></Text> 
          <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={this._heartComment.bind(this)}>
              <Image
                source={heartImage}
                style={{width:20, height:20, marginRight: 4}}
              />
            </TouchableOpacity>
          </View>
      </View>
      );
  },

  _heartComment: function(){
    console.log("I <3 you");
    // fetch('http://uncovery.cloudapp.net/upvote', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     messageId: this.props.commentId,
    //     userToken: this.props.userToken,
    //   })
    // }).then(()=>{
    //   console.log('should re-render with new data')
    //   this.props.fetchData();
    // })
  }

});

var heartImage = {uri: 'http://i.imgur.com/SXHb8nG.png?1'};

module.exports = CommentFooter;
