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
      loaded: false,
      lastPosition: {
        coords: {
          longitude : 0, 
          latitude : 0, 
          altitude : 0,
        }
      } 
    };
   }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => console.error(error)
    );

    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
      this.fetchData();
    });


  }

  fetchData(){

    var x = this.state.lastPosition.coords.latitude;
    var y = this.state.lastPosition.coords.longitude;
    var z = this.state.lastPosition.coords.altitude;
    var requestURL = 'http://uncovery.ngrok.com/?'+'x='+x+'&'+'y='+y+'&'+'z='+z

    fetch(requestURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();

    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(MOCK_DATA),
    //   loaded: true,
    // });
  }

  renderLoadingView() {
   return (
     <View style={{flex: 1,backgroundColor: '#F5FCFF',}}>
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
      <Text> {body.messageString} </Text>
    </View>
    );
  }
};

module.exports = Marks;
