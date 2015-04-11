
var React = require('react-native');
var styles = require('../styles.js');
var PostComment = require('./PostComment.js')


var MOCK_MESSAGE_1 = {
  timestamp: 'now',
  messageString: "I smell tasty hamburgers!!!"
};

var MOCK_MESSAGE_2 = {
  timestamp: '5min ago',
  messageString: "Order the pies, they are delisch"
};

var MOCK_MESSAGE_3 = {
  timestamp: '1hr ago',
  messageString: "I AM THE THUNDERGOD"
};

var MOCK_MESSAGE_4 = {
  timestamp: '2 days ago',
  messageString: "I like pies and fish and pottoes, I like pies and fish and pottoes, I like pies and fish and pottoes, I like pies and fish and pottoes"
};

var MOCK_MESSAGE_5 = {
  timestamp: '2 days ago',
  messageString: "I like pies and fish and pottoes, I like pies and fish and pottoes, I like pies and fish and pottoes, I like pies and fish and pottoes"
};

var MOCK_MESSAGE_6 = {
  timestamp: '2 days ago',
  messageString: "I like pies and fish and pottoes, I like pies and fish and pottoes, I like pies and fish and pottoes, I like pies and fish and pottoes"
};

var MOCK_DATA = [MOCK_MESSAGE_1, MOCK_MESSAGE_2, MOCK_MESSAGE_3, MOCK_MESSAGE_4, MOCK_MESSAGE_5, MOCK_MESSAGE_6];

var {View, Text, Image, ListView, TouchableOpacity} = React;

class Comments extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      update: false,
    };
  }

  componentDidMount(){
    this.fetchData()
  }

  componentWillUnmount(){
    MOCK_DATA.shift()
  }

  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage.bind(this)}
        style={{backgroundColor: '#D7E1EE', height: 400}}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={2000} 
        renderSectionHeader={this.renderSectionHeader.bind(this)}
      />
    );
  }

  renderMessage(body) {
    return(
      <View>
        <View style={[styles.row, body.origin ? styles.messageContainer : styles.commentContainer]}>
          <View>
            <Text></Text>
            <Text style={body.origin ? styles.messageText : styles.commentText}>
              {body.messageString}
            </Text>
            <Text></Text>
            <Text></Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={body.origin ? styles.messageFooter : styles.commentFooter}>{body.timestamp} @ {body.distance}</Text>
            { body.origin ? 
              <Text style={styles.heartCounter}>{body.numHearts ? body.numHearts : null}</Text> :
              <Text style={{marginBottom: 15}}></Text> }
            {body.origin ? 
              <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={this._heartMessage.bind(this)}>
                  <Image
                    source={heartImage}
                    style={{width:30, height:30}}
                  />
                 </TouchableOpacity>
              </View> : 
              <View style={{justifyContent: 'flex-end'}}>
                <Image
                  source={heartImage}
                  style={{width:20, height:20, marginRight: 4}}
                />
              </View>}
            </View>
        </View>
      </View>
    )
    
  }

  renderSectionHeader(data, sectionID){
    return (
      <View style={styles.commentHeaderButton}>
        <TouchableOpacity onPress={this._postComment.bind(this)}>
        <Text style={{color: 'white'}}>
          Comment
        </Text>
        </TouchableOpacity>
      </View>
    );
  }

  fetchData(){
    var originMessage = {
      origin: true, 
      messageString:this.props.messageString, 
      timestamp: this.props.timestamp, 
      distance: this.props.distance,
      numComments: this.props.numComments,
      numHearts: this.props.numHearts,
    }

    MOCK_DATA.unshift(originMessage);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCK_DATA),
    })    
  }

  _postComment(){

    this.props.navigator.push({
      component: PostComment,
      passProps: {
        navigator: this.props.navigator,
        messageId: this.props.messageId,
        userToken: this.props.userToken,
        fetchComments: this.fetchData.bind(this),
      },
    })
  }

  _heartMessage(){
    console.log("I <3 you");

    fetch('http://uncovery.cloudapp.net/upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        messageId: this.props.messageId,
        userToken: this.props.userToken,
      })
    }).then(()=>{
      console.log('should re-render with new data')
      this.props.fetchMessages();
    })
  }
}

var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = Comments;
