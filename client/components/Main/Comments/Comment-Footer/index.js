
var React = require('react-native');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js');

var { View, Text, } = React;

class CommentFooter extends React.Component {

  constructor(){
    this.state = {
      numHearts: null,
      heartPressed: false,
    }
  }

  render(){
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
  }

};

module.exports = CommentFooter;
