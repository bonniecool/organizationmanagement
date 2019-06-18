import React from 'react';
import { render } from 'react-dom';
import alert from 'react-s-alert';
import Modal from 'react-modal'
const markerUniqueID = 'my-alert-marker';

export const passwordAlert = (callback, password = "123123123",) => {
	const rootElement = document.getElementById(markerUniqueID);
	if(!rootElement)
		return alert.danger("Alert Marker not found!");

	const close = () => {
		render(<div id={ markerUniqueID }/>, rootElement);
	}

	let inputRef = {};

	const set = (e) => {
		e.preventDefault();
		if(inputRef.value !== password){
			alert.warning("Wrong password...Please try again");
			return;
		}
		callback(inputRef.value);
		close();
	}

	render(
		<Modal
      className="Modal__Bootstrap modal-md modal-dialog"
      closeTimeoutMS={150}
			ariaHideApp={false}
   	  contentLabel="Confirm"
      isOpen={ true }
      onRequestClose={ () => {} }>
      <div className="modal-content" style={{ border: "3px solid #f00" }}>
   			<div className="modal-header">
         	<h4 className="modal-title text-center">OVERRIDE</h4>
  			</div>
   			<div className="modal-body">
   				<form onSubmit={ set }>
  	 				<input
  	 					autoFocus
  	 					className="form-control"
  	 					placeholder="Please Enter Password..."
  	 					type="password"
  	 					ref={ (ref) => { inputRef = ref }}
  	 				/>
   				</form>
   			</div>
   			<div className="modal-footer">
   				<button type="submit" className="btn btn-primary" onClick={ set }>Override</button>
  				<button type="button" className="btn btn-outline-danger" onClick={ close }>Cancel</button>
   			</div>
      </div>
		</Modal>
	, rootElement);
}

export default class AlertMarker extends React.Component{
	render(){
		return(
			<div id={ markerUniqueID } />
		)
	}
}