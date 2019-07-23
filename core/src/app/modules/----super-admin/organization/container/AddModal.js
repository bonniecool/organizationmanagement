import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
import Select from 'react-select';

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

    handleChangeSelect = (key) => (e) => {
        const {dispatch} = this.props;
        dispatch({
            type:c.SET_FORM_DATA,
            data:{
                [key] : e ? e.value : ''
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
        const { dispatch, form_data } = this.props;
        dispatch({
            type:c.CREATE,
            args:form_data.toJS()
        })
    }

    render() {
        const { form_data,
            regions,
            provinces,
            municipalities,
            barangays, 
        } = this.props;
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
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Region</label>
                                    <Select
                                        value={ form_data.get('region_code') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('region_code')}
                                        name="region_code"
                                        loadingPlaceholder="Loading..."
                                        multi={true}
                                        options={this.props.roles.toJS().map( item => {
                                            return {
                                                label:item.name,
                                                value:item.id
                                            }}
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Province</label>
                                    <Select
                                        value={ form_data.get('province_code') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('province_code')}
                                        name="province_code"
                                        loadingPlaceholder="Loading..."
                                        multi={true}
                                        options={this.props.roles.toJS().map( item => {
                                            return {
                                                label:item.name,
                                                value:item.id
                                            }}
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Municipality</label>
                                    <Select
                                        value={ form_data.get('municipality_code') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('municipality_code')}
                                        name="municipality_code"
                                        loadingPlaceholder="Loading..."
                                        multi={true}
                                        options={this.props.roles.toJS().map( item => {
                                            return {
                                                label:item.name,
                                                value:item.id
                                            }}
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Barangay</label>
                                    <Select
                                        value={ form_data.get('barangay_code') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('barangay_code')}
                                        name="barangay_code"
                                        loadingPlaceholder="Loading..."
                                        multi={true}
                                        options={this.props.roles.toJS().map( item => {
                                            return {
                                                label:item.name,
                                                value:item.id
                                            }}  
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <input type="text" name="zip_code" className="form-control" onChange={this.onChangeInput} value={form_data.get('zip_code')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input type="text" name="transportation_allowance" className="form-control" onChange={this.onChangeInput} value={form_data.get('transportation_allowance')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control" onChange={this.onChangeInput} value={form_data.get('email')} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Representative</label>
                                    <input type="text" name="reps" className="form-control" onChange={this.onChangeInput} value={form_data.get('reps')} />
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
    const regions = state.superAdminOrganization.get('regions')
    const provinces = state.superAdminOrganization.get('provinces')
    const municipalities = state.superAdminOrganization.get('municipalities')
    const barangays = state.superAdminOrganization.get('barangays')
    return {
        form_data,
        regions,
        provinces,
        municipalities,
        barangays,
    };
};

export default withRouter(connect(mapPropsToState)(AddDeductionModal));