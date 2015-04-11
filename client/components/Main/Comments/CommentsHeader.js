var React = require('react-native');
var styles = require('../../../styles.js');
var PostComment = require('./PostComment.js')

var { View, Text, StyleSheet, TouchableOpacity, } = React;


var CommentsHeader = React.createClass({

  render: function(){
    return (
      <View style={styles.commentHeaderButton}>
        <TouchableOpacity onPress={this._postComment}>
        <Text style={{color: 'white'}}>
          Comment
        </Text>
        </TouchableOpacity>
      </View>
    );
  },

  _postComment: function(){
    this.props.navigator.push({
      component: PostComment,
      passProps: {
        navigator: this.props.navigator,
        messageId: this.props.messageId,
        userToken: this.props.userToken,
        fetchComments: this.fetchData,
      },
    })
  }

});

module.exports = CommentsHeader;
