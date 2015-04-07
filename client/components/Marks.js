
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
      currentPosition: {
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

    var watchSucess = (currentPosition) => {
      this.setState({currentPosition});
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

    var x = this.state.currentPosition.coords.latitude;
    var y = this.state.currentPosition.coords.longitude;
    var z = this.state.currentPosition.coords.altitude;
    var token = this.props.route.userToken;
    var requestURL = config.host + 'x='+x+'&'+'y='+y+'&'+'z='+z+'&'+'userToken='+token;
    
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
    if ( !this.state.loaded || !this.props.route.userToken ) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage.bind(this)}
        style={{backgroundColor: '#B0C4DE'}}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={2000} />
    );
  }

  renderMessage(body) {
    var userToken = this.props.route.userToken;
    return (
      <Message body={body} userToken={userToken}/>
    );
  }

};

module.exports = Marks;
