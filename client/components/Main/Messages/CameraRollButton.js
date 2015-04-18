var React = require('react-native')

var { Image, TouchableOpacity, View, Text, } = React

var CameraRollButton = React.createClass({

  getInitialState: function(){
    return {selected: false};
  },

  render: function(){
    var source = {uri: 'http://i.imgur.com/biCwb3r.png'}
    return (
      <TouchableOpacity onPress={this._select.bind(this)}>
        <Image
          source={source}
          style={{width:40, height: 30, borderRadius: 5}}
        />
      </TouchableOpacity>
    )
  },

  _select: function(){
    this.setState({selected: this.state.selected ? false : true})
    this.props.navToCameraRoll();
  }
});

module.exports = CameraRollButton;
