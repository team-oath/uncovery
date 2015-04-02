var React = require('react-native');
var styles = require("../styles.js");
var MOCK_DATA = require("../mockData.js");

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
  ListView,
  SwitchIOS,
  Text,
  TextInput
} = React;

var Marks = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },

  rowHasChanged: function(){ },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCK_DATA),
      loaded: true,
    });
  },

  renderLoadingView: function() {
   return (
     <View style={styles.container}>
       <Text>
         Loading messages...
       </Text>
     </View>
   );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage}
        style={styles.listView} />
    );
  },

  renderMessage: function(message) {
    console.log(message)
    return (
    <View style={styles.container}>
      <Text> </Text>
      <Text style={{textAlign: 'right', fontSize: 8}}> {message.timestamp} </Text>
      <Text> {message.body} </Text>
    </View>
    );
  }

});

module.exports = Marks;
