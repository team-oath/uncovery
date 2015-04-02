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
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCK_DATA),
      loaded: true,
    });
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

  renderMessage(message) {
    console.log(message)
    return (
    <View style={styles.container}>
      <Text> </Text>
      <Text style={{textAlign: 'right', fontSize: 8}}> {message.timestamp} </Text>
      <Text> {message.body} </Text>
    </View>
    );
  }
};

module.exports = Marks;
