import React from 'react';
import { render } from 'react-dom';

export const ConfirmAlert = (label, onYes, onNo, options = { yesLabel: "Yes", noLabel: "No" }) => {
	const rootElement = document.getElementById('my-confirm-modal');

	const handleYes = () => {
		onYes();
		render(<div id="my-confirm-modal"/>, rootElement);
	}

	const handleNo = () => {
		onNo();
		render(<div id="my-confirm-modal"/>, rootElement);
	}

	render(
		<div>	
			<div style={{ position: 'absolute'}}>
				<div className="modal fade show" style={{display: 'block', zIndex: 1051, pointerEvents: "none"}}>
	                <div className="modal-dialog" style={{pointerEvents:"initial"}}>
	                    <div className="modal-content">
	                        <div className="modal-header">
	                            <h4 className="modal-title">Confirmation</h4>
	                        </div>
	                        <div className="modal-body">
	                            <label>{ label }</label>
	                        </div>
                        	<div className="modal-footer">
								<button 
									className="btn btn-primary"
									onClick={ handleYes }>{ options.yesLabel }</button>
								{ ' ' }
								<button 
									className="btn btn-default"
									onClick={ handleNo }>{ options.noLabel }</button>
							</div>
	                    </div>
	                </div>
	            </div>
        		<div className="modal-backdrop fade show" style={{zIndex: 1050, pointerEvents: "initial"}} onClick={ handleNo }/> 
            </div>
		</div>
	, rootElement);
}