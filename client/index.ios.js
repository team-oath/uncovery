/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

var MOCK_MESSAGE_1 = {
  timestamp: 'now',
  body: "I smell tasty hamburgers"
};

var MOCK_MESSAGE_2 = {
  timestamp: '5 min ago',
  body: "I like pies"
};

var MOCK_MESSAGE_3 = {
  timestamp: '1hr ago',
  body: "The sunset was terrible yesterday"
};

var MOCK_MESSAGE_4 = {
  timestamp: '2d ago',
  body: "It kinda smells here"
};

var MOCK_MESSAGE_5 = {
  timestamp: 'one week ago',
  body: "strawberries or snozzberries?"
};

var MOCK_DATA = [MOCK_MESSAGE_1, MOCK_MESSAGE_2, MOCK_MESSAGE_3, MOCK_MESSAGE_4, MOCK_MESSAGE_5];

var uncovery = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

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
    return (
    <View style={styles.container}>
      <Text> </Text>
      <Text style={{textAlign: 'right', fontSize: 8}}> {message.timestamp} </Text>
      <Text> {message.body} </Text>
    </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('uncovery', () => uncovery);
