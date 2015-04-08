
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
    };
  }

  componentDidMount() {
   this.fetchData();
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
        scrollRenderAheadDistance={2000} 
        onScroll={this._handleScroll.bind(this)}/>
    );

  }

  renderMessage(body) {
    var userToken = this.props.route.userToken;
    return (
      <Message body={body} userToken={userToken}/>
    );
  }

  fetchData(){
    var x = this.props.route.currentPosition.coords.latitude;
    var y = this.props.route.currentPosition.coords.longitude;
    var z = this.props.route.currentPosition.coords.altitude;
    var token = this.props.route.userToken;
    var requestURL = config.host + 'x='+x+'&'+'y='+y+'&'+'z='+z+'&'+'userToken='+token;

    var watchOptions = {
      enableHighAccuracy: true,
    };

    var watchSucess = (currentPosition) => {
      this.props.route[currentPosition] = currentPosition;
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

    var watchError = (error) => console.error(error);

    navigator.geolocation.getCurrentPosition(
      watchSucess, watchError, watchOptions
    );
  }

  _handleScroll(event){
    var pullDown = event.nativeEvent.contentOffset.y < -150;
    if ( pullDown ){
     this.fetchData();
    } 
  }

};

module.exports = Marks;
