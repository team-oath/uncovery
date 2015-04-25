var React = require('react-native')

var { Image, TouchableOpacity, View, Text, } = React

class CameraRollButton extends React.Component {

  constructor(){
    this.state = {selected: false};
  }

  render(){
    
    var source;
    console.log("RENDER IMG BUTTON", this.props.userHasSelectAnImage)
    if (this.props.userHasSelectAnImage){
      source = {uri: 'http://i.imgur.com/FGUvceF.png'}
    }else{
      source = {uri: 'http://i.imgur.com/biCwb3r.png'}
    }

    return (
      <TouchableOpacity onPress={this._select.bind(this)}>
        <Image
          source={source}
          style={{width:40, height: 30, borderRadius: 5}}
        />
      </TouchableOpacity>
    )
  }

  _select(){
    this.setState({selected: this.state.selected ? false : true})
    this.props.navToCameraRoll();
  }

};

module.exports = CameraRollButton;
