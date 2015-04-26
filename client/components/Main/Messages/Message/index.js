
var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var Comments = require('../../Comments');
var Footer = require('../Footer');
var Thumbnail = require('../../Thumbnails');
var BackButton = require('../../Nav/BackButton.js');

var styles = require('../../../../styles.js');
var createRequestURL = require('../../../createRequestURL.js');

var { 

  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableWithoutFeedback,
  Navigator,

} = React;

class Message extends React.Component {

  constructor(props) {
    this.state = { 
      numHearts: props.message.votes, 
      hasPressedHeart: props.message.voted,
      load: false,
    }
  }

  componentWillReceiveProps(props){

    // update hearts only if the update is a fetch
    if (!this.state.load){
      this.setState({
        numHearts: props.message.votes, 
        hasPressedHeart: props.message.voted,
      })

    // if update is from a state change, then set state back
    } else { this.setState({load:false})}
    
  }


  render(message) {

    var {

      votes, 
      voted, 
      messageString, 
      image, 
      ...footer

    } = this.props.message;

    return (
      <View style={[styles.buttonContents, {flexDirection: 'column'}]}>
        <TouchableWithoutFeedback onPress={this._onPressMessage.bind(this)}>
          <View>
            <Text style={[styles.messageText, {marginTop: 25}]}>
              {messageString}
            </Text>
            <Thumbnail 
              uri={image} 
              fullResolution={false}
            />
            <Text></Text>
          </View>
        </TouchableWithoutFeedback>
        <Footer
          {...footer}
          navToComment={this._onPressMessage.bind(this)} 
          numHearts={this.state.numHearts}
          hasPressedHeart={this.state.hasPressedHeart}
          updateHearts={this._updateHearts.bind(this)}
        />
        <View style={styles.seperator} />
      </View>

    );
  }

  _onPressMessage() {

    var {message, ...props} = this.props;
    var {votes, ...message} = this.props.message;
    var hasPressedHeart = this.state.hasPressedHeart;
    var numHearts = this.state.numHearts;
    var fetchMessages = this._updateHearts.bind(this);
    var self = this;

    this.props.navigator.push({
      component: Comments,
      passProps: Object.assign(
        {...message}, 
        {...props},
        {numHearts}, 
        {hasPressedHeart},
        {fetchMessages}),
      navigationBar: <NavigationBar backgroundColor='#C0362C' customPrev={<BackButton/>}/>,
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    })
  }

  _updateHearts(){

    var requestURL = createRequestURL('upvote', null, 'POST');
    
    if (this.state.hasPressedHeart) {
      var decrement = this.state.numHearts - 1
      this.setState({
        numHearts: decrement,
        hasPressedHeart: false,
        load:true,
      });

    } else {
      var increment = this.state.numHearts + 1;
      this.setState({
        numHearts: increment,
        hasPressedHeart: true,
        load:true,
      });
    }

    fetch(requestURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        messageId: this.props.message.messageId,
        userToken: this.props.userToken,
      })
    }).then(()=>{
      this.props.fetchMessages();
    }).catch((e)=>{console.log(e)
    }).done();
  }

};

module.exports = Message
