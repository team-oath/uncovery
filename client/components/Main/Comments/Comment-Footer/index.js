
var React = require('react-native');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js');

var { View, Text, } = React;

var CommentFooter = React.createClass({

  getInitialState: function(){
    return {
      numHearts: null,
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
          
        </View>
      </View>
    );
  },

});

module.exports = CommentFooter;
