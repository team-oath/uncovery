var React = require('react-native');
var styles = require("../styles.js");
var MOCK_DATA = require("../mockData.js");

var {View, ListView, Text,} = React;

class Marks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
   }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
  
    // Using test server to send response data:

      /*
      [ { timestamp: 'now', message: 'I smell tasty hamburgers!!!' },
        { timestamp: '5 min ago', message: 'I like pies' },
        { timestamp: '5 min ago', message: 'I like pies' },
        { timestamp: '5 min ago', message: 'I like pies' } ]
      */
    var x = 50.2;
    var y = 100.1;
    var z = 500;
    var requestURL = 'http://localhost:6666/data?'+'x='+x+'&'+'y='+y+'&'+'z='+z

    fetch(requestURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  renderLoadingView() {
   return (
     <View style={styles.container}>
       <Text>
         Loading messages...
       </Text>
     </View>
   );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage}
        style={styles.listView} />
    );
  }

  renderMessage(body) {
    return (
    <View style={styles.container}>
      <Text> </Text>
      <Text style={{textAlign: 'right', fontSize: 8}}> {body.timestamp} </Text>
      <Text> {body.message} </Text>
    </View>
    );
  }
};

module.exports = Marks;
