
var React = require('react-native');
var Message = require('./Message.js')
var config = require('../config.js')

var {View, ListView, Text, AsyncStorage} = React;

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

    var watchOptions = {
      enableHighAccuracy: true,
    };

    var watchSucess = (lastPosition) => {
      this.fetchData();
    }

    var watchError = (error) => console.error(error);

    navigator.geolocation.getCurrentPosition(
      watchSucess, watchError
    );

    this.watchID = navigator.geolocation.watchPosition(
     watchSucess, watchError, watchOptions
    );
  }

  fetchData(){

    var x = this.state.lastPosition.coords.latitude;
    var y = this.state.lastPosition.coords.longitude;
    var z = this.state.lastPosition.coords.altitude;
    var id = this.state.userid;
    var requestURL = config.host + 'x='+x+'&'+'y='+y+'&'+'z='+z+'&'+'userid='+id;

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
     <View style={{flex: 1}}>
       <Text>
         Loading messages...
       </Text>
     </View>
   );
  }

  render() {
    if ( !this.state.loaded || !this.state.userid ) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage}
        style={{backgroundColor: '#B0C4DE'}}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={2000} />
    );
  }

  renderMessage(body): ReactElement {
    return (
      (<Message body={body} userid={this.state.userid}/>)
    );
  }

};

module.exports = Marks;
