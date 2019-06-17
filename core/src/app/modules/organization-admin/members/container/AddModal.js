import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
import Uploader from 'app/modules/uploadcare/Uploader';
import { _ } from 'app/Utils';

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
                                    <label>Organization Name</label>
                                    <input name="employee_number" className="form-control" onChange={this.onChangeInput} value={form_data.get('employee_number')} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="number" name="rice_allowance" className="form-control" onChange={this.onChangeInput} value={form_data.get('rice_allowance')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input type="number" name="transportation_allowance" className="form-control" onChange={this.onChangeInput} value={form_data.get('transportation_allowance')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="number" name="transportation_allowance" className="form-control" onChange={this.onChangeInput} value={form_data.get('transportation_allowance')} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Representative</label>
                                    <input type="number" name="transportation_allowance" className="form-control" onChange={this.onChangeInput} value={form_data.get('transportation_allowance')} />
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