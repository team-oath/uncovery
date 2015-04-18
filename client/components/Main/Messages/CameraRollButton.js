var React = require('react-native')

var { Image, TouchableOpacity, View, Text, } = React

var CameraRollButton = React.createClass({

  getInitialState: function(){
    return {selected: false};
  },

  render: function(){
    var source = {uri: this.state.selected ? 'http://i.imgur.com/RcLi64D.png' : 'http://i.imgur.com/FP9JdCr.png'}
    return (
      <TouchableOpacity onPress={this._select.bind(this)}>
        <Image
          source={source}
          style={{width:30, height: 30}}
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
