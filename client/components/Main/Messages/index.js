
var React = require('react-native');

/* ------ Components ------- */

var Message = require('./Message');
var MessageStreamSwitcher = require('../Nav/MessageStreamSwitcher.js');
var MessageTextInputButton = require('../Nav/MessageTextInputButton.js');
var NumHeartsDisplay = require('../Nav/NumHeartsDisplay.js');
var CameraRollButton = require('../Nav/CameraRollButton.js');
var SettingsButton = require('../Nav/SettingsButton.js');
var MessageTextInput = require('./TextInput');

/* ------ Configs ------- */

var HOST = require('../../../config.js');
var styles = require('../../../styles.js'); 

/* ------ React Components ------- */

var {

  View, 
  ListView, 
  Text, 
  ActivityIndicatorIOS, 
  TouchableOpacity, 
  Image, 
  Navigator,

} = React;

/* ------ Main Component ------- */

class Messages extends React.Component {

  constructor(props) {
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      reloading: false,
      coords: null,
      edit: false, 
    };

    this.displayName = "Messages"
  }

  componentDidMount() {
    this.fetchMessages();

    // Custom Navbar for Message Component
    if (this.props.navBar) {
      this.props.navBar = React.addons.cloneWithProps(this.props.navBar, {
        customNext: 
          <MessageTextInputButton 
            show={this._toggleEdit.bind(this)}
          />,
        customTitle: 
          <NumHeartsDisplay 
            userToken={this.props.userToken} 
            socket={this.props.socket}
          />,
        customPrev: 
          <SettingsButton/>,
      });
    }
    
  }

  render() {

    if ( !this.state.loaded || !this.props.userToken ) {
      return null;
    }
    return (
      <View>
        { this.props.navBar }
        { this.state.edit ? 
        <MessageTextInput 
          toggleEdit={this._toggleEdit.bind(this)}
          navigator={this.props.navigator}
          fetchMessages={this.fetchMessages.bind(this)}
        /> : null }
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMessage.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{backgroundColor: 'white', height: require('Dimensions').get('window').height-62,}}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000} 
          onScroll={this._handleScroll.bind(this)}
        />
      </View>
      );
  }

  _toggleEdit(){
    console.log('toggggle')
    this.setState({edit: this.state.edit ? false : true});
  }

 

  renderMessage(message) {
    return (
      <Message 
        message={message} 
        userToken={this.props.userToken} 
        navigator={this.props.navigator} 
        fetchMessages={this.fetchMessages.bind(this)}
        coords={this.state.coords}
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

  renderHeader(){
    if (this.state.reloading) {
      return (
        <View style={styles.loadingHeader}>
          <ActivityIndicatorIOS 
            animating={true}
            style={{alignItems:'center',justifyContent: 'center'}}
            size="large" 
          />
        </View>
      )
    }
    return null;
  }

  fetchMessages(loading){

    var requestURL = createRequestURL(HOST, '/messages', this.props)

    // Loading Header Logic

    if (this.willReload || this.state.reloading) { 
      return; 
    }

    this.willReload = true;

    // Update Datasource according to current location
  
    navigator.geolocation.getCurrentPosition( (position) => {

      if (loading) {
        this.setState({reloading: true})
      }

      var updateDataSource = (data) => {
        this.willReload = false;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true,
          reloading: false,
          coords: position.coords,
        });
      };
      
      fetch(requestURL)
        .then( (response) => response.json() )
        .then( (data) => {
          if ( loading ) {
            setTimeout(updateDataSource.bind(this,data), 300);
          } else {
            updateDataSource.bind(this,data)();
          }
        })
        .catch( (error) => console.log(error) )
        .done();
      })
  }

  _handleScroll(event){
    var pullDown = event.nativeEvent.contentOffset.y < -100;
    if ( pullDown ){
      this.fetchMessages('loading');
    } 
    this.props.onScroll && this.props.onScroll(e)
  }

};

function createRequestURL(host, route, props){

  var requestURL, params;
  var x = props.currentPosition.coords.latitude;
  var y = props.currentPosition.coords.longitude;
  var z = props.currentPosition.coords.altitude;
  var userToken = props.userToken;

  params = `?x=${x}&y=${y}&z=${z}&userToken=${userToken}`;
  requestURL = `${host}${route}${params}`

  return requestURL;
};

module.exports = Messages;