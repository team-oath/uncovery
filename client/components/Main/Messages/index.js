
var React = require('react-native');
var Message = require('./Message.js');
var SideMenu = require('react-native-side-menu');
var Menu = require('../../Menu/index.js')

var {View, ListView, Text, AsyncStorage} = React;

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          return JSON.stringify(row1) !== JSON.stringify(row2)
        },
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchMessages();
    Reactive.on('posted', (()=>{
      this.fetchMessages();
    }).bind(this) );
  }

  render() {
    var menu = <Menu navigator={this.props.navigator}/>;
    
    if ( !this.state.loaded || !this.props.userToken ) {
      return this.renderLoadingView();
    }

    return (
      <SideMenu menu={menu}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMessage.bind(this)}
          style={{backgroundColor: '#D7E1EE', height: 400}}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000} 
          onScroll={this._handleScroll.bind(this)}
        />
      </SideMenu>
      );
  }

  renderMessage(body) {
    return (
      <Message 
        body={body} 
        userToken={this.props.userToken} 
        navigator={this.props.navigator} 
        fetchMessages={this.fetchMessages.bind(this)}
      />
    );
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

  fetchMessages(){
    console.log('hello')
    var x = this.props.currentPosition.coords.latitude;
    var y = this.props.currentPosition.coords.longitude;
    var z = this.props.currentPosition.coords.altitude;
    var userToken = this.props.userToken;
    var queryParams = ['?','x=',x,'&','y=',y,'&','z=',z,'&','userToken=',userToken].join('');
    var requestURL = 'http://uncovery.cloudapp.net/messages/' + queryParams;

    var watchOptions = {
      enableHighAccuracy: true,
    };

    var watchSucess = (currentPosition) => {
      this.props[currentPosition] = currentPosition;
      fetch(requestURL)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            loaded: true,
          });
        })
        .done();
    }

    var watchError = (error) => {console.error(error)};

    navigator.geolocation.getCurrentPosition(
      watchSucess, watchError, watchOptions
    );
  }

  _handleScroll(event){
    var pullDown = event.nativeEvent.contentOffset.y < -200;
    if ( pullDown ){
      this.fetchMessages();
    } 
  }

};

module.exports = Messages;
