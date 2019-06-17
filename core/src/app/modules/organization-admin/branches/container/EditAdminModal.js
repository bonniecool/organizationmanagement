import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';

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

    handleChangeSelect = (key) => (value) => {
        const {dispatch, form_data} = this.props;
        dispatch({
            type:c.SET_FORM_DATA,
            data:{
                [key] : value || ''
            }
        })
        if(key === 'region_code'){
            dispatch({
                type:c.GET_PROVINCES,
                region_id:value || ''
            })
        }
        if(key === 'province_code'){
            dispatch({
                type:c.GET_MUNICIPALITIES,
                region_id:form_data.get('region_code'),
                province_id:value || '',
            })
        }
        if(key === 'municipality_code'){
            dispatch({
                type:c.GET_BARANGAYS,
                region_id:form_data.get('region_code'),
                province_id:form_data.get('province_code'),
                municipality_id:form_data.get('municipality_code'),
            })
        }
        
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
        console.log('here')
        dispatch({
            type:c.UPDATE_MEMBER,
            id:data.get('id'),
            args:{
                first_name:form_data.get('first_name'),
				last_name:form_data.get('last_name'),
				email:form_data.get('email'),
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
    const form_data = state.organizationBranch.get('form_data')

    return {
        form_data,
    };
};

export default withRouter(connect(mapPropsToState)(AddDeductionModal));