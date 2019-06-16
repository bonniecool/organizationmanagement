import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';

class RemoveAdminModal extends Component {

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

    onSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form_data, data } = this.props;
        dispatch({
            type:c.REMOVE_MEMBER,
            id:data.get('id'),
            args:{
				id:form_data.get('id'),
            }
        })
    }

    render() {
        const { form_data, 
        } = this.props;
        return (
            <div>
             <form onSubmit={ this.onSubmit }>
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Remove {form_data.get('last_name')}, {form_data.get('first_name')}</label>

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
    const form_data = state.branchMembers.get('form_data')

    return {
        form_data,
    };
};

export default withRouter(connect(mapPropsToState)(RemoveAdminModal));