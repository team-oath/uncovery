
var React = require('react-native')
var Reactive = require('../../../react-events.js')

var { TouchableOpacity, Image, View, } = React;

class MessageTextInputButton extends React.Component {

  constructor(){
    this.state = {toggle: false}
  }

  componentDidMount(){
    // Reactive.on('submit', function(){
    //   this._toggle.bind(this)
    // })
  }

  render(){

    var x = {uri: 'http://i.imgur.com/baqD8a8.png'},
        plus = {uri: 'http://i.imgur.com/UaJpmco.png'},
        source = this.state.toggle ? x : plus,
        style = {width:35, height:35, marginTop: 5, marginRight: 10,  marginBottom: 2, };

    return (
      <TouchableOpacity 
        onPress={this._toggle.bind(this)}>
        <Image
          source={source}
          style={style}
        />
      </TouchableOpacity>
    );
  }

  _toggle(){
    this.props.show();
    this.setState({toggle:this.state.toggle ? false : true});
  }

};

module.exports = MessageTextInputButton;
