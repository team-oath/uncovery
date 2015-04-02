/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
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

var MOCK_MESSAGE_1 = {
  timestamp: 'now',
  body: "I smell tasty hamburgers"
};

var MOCK_MESSAGE_2 = {
  timestamp: '5 min ago',
  body: "I like pies"
};

var MOCK_MESSAGE_3 = {
  timestamp: '5 min ago',
  body: "I like pies"
};

var MOCK_MESSAGE_4 = {
  timestamp: '5 min ago',
  body: "I like pies"
};

var MOCK_DATA = [MOCK_MESSAGE_1, MOCK_MESSAGE_2, MOCK_MESSAGE_3, MOCK_MESSAGE_4];

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

var postForm = React.createClass({
  
  getInitialState() {
    return {};
  },
  
  render() {
    return (
      <View style={{ top: 64 }}>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({input: text})}
          />
        <Text>{'user input: ' + this.state.input}</Text>
      </View>
    );
  }
  
});

var uncovery = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={{
          title: 'UIExplorer :)',
          rightButtonTitle: 'Mark',
          onRightButtonPress: () => {
            this.refs.nav.push({
              component: postForm,
              title: 'sdf'
            });
          },
          component: Marks
        }}
        itemWrapperStyle={styles.itemWrapper}
        tintColor='#008888'
      />
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingTop: 0,
    paddingRight: 10,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('uncovery', () => uncovery);
