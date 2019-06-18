import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import { queryStringToJSON } from '../../../Helpers';

import './style.css';

const insertUrl = (url ,idx, rem, str) => {
    return url.slice(0, idx) + str + url.slice(idx + Math.abs(rem));
};

class AttachmentImage extends Component{

	state = {
		angle: 0
	}

	componentDidMount(){
		
	}

	handleChangeAngleLeft = () => {
		let angle = this.state.angle;

		switch(angle){
			case 0:
				angle = 90;
				break;
			case 90:
				angle = 180;
				break;
			case 180:
				angle = 270;
				break;
			default:
				angle = 0
				break;
		}

		this.setState({
			angle
		})
	}

	handleChangeAngleRight = () => {
		let angle = this.state.angle;

		switch(angle){
			case 0:
				angle = 270;
				break;
			case 90:
				angle = 0;
				break;
			case 180:
				angle = 90;
				break;
			default:
				angle = 180
				break;
		}
		
		this.setState({
			angle
		})
	}

	render(){

		const raw = `${this.props.photo}`;

		const { label } = this.props;

		const url = insertUrl(raw,raw.lastIndexOf('/'), 0, `/-/rotate/${this.state.angle}`)

		return(
			<div>
				<button className="lightbox-rotate-left" onClick={ this.handleChangeAngleLeft }><i className="fa fa-rotate-left" /></button>
				<button className="lightbox-rotate-right" onClick={ this.handleChangeAngleRight }><i className="fa fa-rotate-right" /></button>
				<Lightbox
	                mainSrc={ url }
	                imageCaption={ label }
	                clickOutsideToClose={ false }
	                onCloseRequest={() => { }} />
            </div>
		)
	}
}

export default withRouter(connect(
	(state, route) => {

        const query = queryStringToJSON(route.location.search);

		const photo = query.img;
		const label = query.label || "";

		const token = sessionStorage.getItem('token');

		return{
			photo,
			label,
			token
		}
	}
)(AttachmentImage))