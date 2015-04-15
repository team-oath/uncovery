var React = require('react-native');

var HOST = require('../../../config.js'); 

var { Image, } = React;

class Thumbnails extends React.Component {

	constructor(props){		
	}

	render(){		
		var window = require('Dimensions').get('window');
		var uri = HOST + 'images?image=' + this.props.uri;
		
		var height = 100;
		var resizeMode = Image.resizeMode.cover;

		if (this.props.fullResolution){
			//Square image
			height = window.width;
			resizeMode = Image.resizeMode.contain;
		}

		return (
			<Image style={{height: height, resizeMode: resizeMode }} source={{uri: uri }} />
		)
		
	}
}

module.exports = Thumbnails;

// /thumb = '<thumbnails>'Thumbnails({ some: propertie });
