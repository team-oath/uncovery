
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

var {View, Text, Image, ListView, ScrollView, TextInput, TouchableOpacity} = React;

class Comments extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentWillMount(){
    this.fetchData()
  }

  fetchData(){
    MOCK_DATA.unshift({messageString:this.props.messageString, origin: true, timestamp: this.props.timestamp, distance: this.props.distance})
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCK_DATA),
    })    
  }

  componentWillUnmount(){
    MOCK_DATA.shift()
  }

  renderMessage(body) {
    return(
      <View>
        <View style={[styles.row,{backgroundColor: 'white', flexDirection: 'column'}]}>
          <View>
             <Text></Text>
             <Text style={body.origin ? {paddingLeft: 12, paddingRight: 12, fontSize: 14} : {paddingLeft: 35, paddingRight: 12, fontSize: 14}}>{body.messageString}</Text>
             <Text></Text>
             <Text></Text>
           </View>
           <View style={{flexDirection: 'row'}}>
             <Text style={body.origin ? {fontSize: 14, color: 'grey', flex: 2, paddingTop: 5, paddingLeft: 12,} : {fontSize: 14, color: 'grey', flex: 2, paddingTop: 5, paddingLeft: 35,}}>{body.timestamp} @ {body.distance}</Text>
            {body.origin ? 
              <Text style={{fontSize: 16, paddingTop: 5, color: 'grey'}}>{this.props.numHearts}</Text> :
              <Text style={{marginBottom: 15}}></Text>
            }
             {body.origin ? 
              <View style={{justifyContent: 'flex-end'}}>
                <Image
                  source={heartImage}
                  style={{width:30, height:30}}
                />
              </View> : <View></View>
             }
           </View>
        </View>
        <View style={styles.separator} />
      </View>
    )
    
  }

  renderSectionHeader(data, sectionID){
    console.log('356987356983576', this._postComment)
    return (
      <View style={{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998',
        flexDirection: 'row',
      }}>
        <TouchableOpacity onPress={this._postComment.bind(this)}>
        <Text style={{color: 'white'}}>
          Comment
        </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _postComment(){
    this.props.navigator.push({
      component: PostComment,
    })
  }

  render(){
    return (
     // <View style={[styles.buttonContents, {
     //    flexDirection: 'column', 
     //    marginTop: 75,
     //    borderColor: 'gray', 
     //    borderWidth: 1,
     //    borderRadius: 20,
     //  }]}>
     //   <View>
     //     <Text></Text>
     //     <Text style={{paddingLeft: 12, paddingRight: 12, fontSize: 14}}>{this.props.messageString}</Text>
     //     <Text></Text>
     //     <Text></Text>
     //   </View>
     //   <View style={{flexDirection: 'row'}}>
     //     <Text style={{fontSize: 14, color: 'grey', flex: 2, paddingTop: 5, paddingLeft: 12,}}>{this.props.timestamp} @ {this.props.distance}</Text>
     //     <Text style={{fontSize: 16, paddingTop: 5, color: 'grey'}}>{this.props.numHearts}</Text>
     //     <View style={{justifyContent: 'flex-end'}}>
     //       <Image
     //         source={heartImage}
     //         style={{width:30, height:30}}
     //       />
     //     </View>
     //   </View>
     // </View>

       <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderMessage.bind(this)}
         style={{backgroundColor: '#B0C4DE'}}
         initialListSize={10}
         pageSize={4}
         renderSectionHeader={this.renderSectionHeader.bind(this)}/>
  
      )
  }

}
var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = Comments;