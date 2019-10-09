import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';

class RemoveModal extends Component {

    onChangeInput = e => {
        e.preventDefault();
        const {dispatch} = this.props;
        const { name, value } = e.target;
        dispatch({
            type:c.SET_FORM_DATA,
            data:{
                [name] : value
            }
        })
    }

    closeModal = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "MODAL",
            data: {
                isOpen: false
            }
        })
    }

    handleOnChangeDate = key => (value) => {
        const { dispatch } = this.props;
        dispatch({
          type: c.SET_FORM_DATA,
          data: {
            [key]: value,
          },
        });
      }

    handleChangeSelect = (key) => (value) => {
        const {dispatch} = this.props;
        dispatch({
            type:c.SET_FORM_DATA,
            data:{
                [key] : value || ''
            }
        })
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { dispatch, data } = this.props;
        dispatch({
            type:c.REMOVE,
            id:data.get('id')
            
        })
    }

    render() {
        const { details } = this.props;

        return (
            <div>
             <form onSubmit={ this.onSubmit }>
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <h3>Remove {details.get('subject')}?</h3>
                                </div>
                            </div>
                        </div>
                        
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        type="submit"
                        className="btn btn-primary btn-md">
                        Submit
                    </button>
                    <button 
                        onClick={ this.closeModal }
                        className="btn btn-danger btn-md">
                        Close
                    </button>
                </Modal.Footer>
                </form>
            </div>
        );
    }
}

const mapPropsToState = (state, routeParams) => {
    const form_data = state.branchReminders.get('form_data')
    const details = state.branchReminders.get('details')
    return {
        form_data,
        details
    };
};

export default withRouter(connect(mapPropsToState)(RemoveModal));