import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
import Select from 'react-select';

class AddDeductionModal extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
			type:c.GET_REGIONS
		})
		
    }
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
            type:c.CREATE_MEMBER,
            id:data.get('id'),
            args:form_data.toJS()
        })
    }

    render() {
        const { form_data, 
                regions,
                provinces,
                municipalities,
                barangays,
                loadingTypes,
        } = this.props;
        return (
            <div>
             <form onSubmit={ this.onSubmit }>
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="first_name" className="form-control" onChange={this.onChangeInput} value={form_data.get('first_name')} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="last_name" className="form-control" onChange={this.onChangeInput} value={form_data.get('last_name')} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control" onChange={this.onChangeInput} value={form_data.get('email')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control" onChange={this.onChangeInput} value={form_data.get('password')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" name="password_confirmation" className="form-control" onChange={this.onChangeInput} value={form_data.get('password_confirmation')} />
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

export default withRouter(connect(mapPropsToState)(AddDeductionModal));