import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
// import Select from 'react-select';
// import { _ } from '../../../Utils';

class AddDeductionModal extends Component {


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
        this.props.onSubmit()
    }

    render() {
        const { form_data } = this.props;
        return (
            <div>
             <form onSubmit={ this.onSubmit }>
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input name="employee_number" className="form-control" onChange={this.onChangeInput} value={form_data.get('employee_number')} />
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
    const form_data = state.superAdminOrganization.get('form_data')
    return {
        form_data
    };
};

export default withRouter(connect(mapPropsToState)(AddDeductionModal));