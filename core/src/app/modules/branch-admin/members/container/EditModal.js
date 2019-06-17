import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';

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
        const { dispatch, form_data } = this.props;
        dispatch({
            type:c.UPDATE,
            args:{
                first_name: form_data.get('first_name'),
                last_name: form_data.get('last_name'),
                suffix: form_data.get('suffix'),
                birth_date: moment(form_data.get('birth_date')).format('YYYY-MM-DD'),
                gender: form_data.get('gender'),
                mobile_number: form_data.get('mobile_number'),
                region_code: form_data.get('region_code'),
                province_code: form_data.get('province_code'),
                municipality_code: form_data.get('municipality_code'),
                barangay_code: form_data.get('barangay_code'),
                zip_code: form_data.get('zip_code'),
                street: form_data.get('street'),
                email: form_data.get('email'),
            },
            id:form_data.get('uuid')
            
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
        const gender = [
            {name:'MALE'},
            {name:'FEMALE'},
        ]
        return (
            <div>
             <form onSubmit={ this.onSubmit }>
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="first_name" className="form-control" onChange={this.onChangeInput} value={form_data.get('first_name')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Middle Name</label>
                                    <input type="text" name="middle_name" className="form-control" onChange={this.onChangeInput} value={form_data.get('middle_name')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="last_name" className="form-control" onChange={this.onChangeInput} value={form_data.get('last_name')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Suffix</label>
                                    <input type="text" name="suffix" className="form-control" onChange={this.onChangeInput} value={form_data.get('suffix')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <Select
                                        value={ form_data.get('gender') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('gender')}
                                        name="gender"
                                        loadingPlaceholder="Loading..."
                                        options={gender.map( item => {
                                            return {
                                                label:item.name,
                                                value:item.name
                                            }}  
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Birth Date</label>
                                    <DatePicker
                                        required
                                        selected={form_data.get('birth_date')}
                                        name="birth_date"
                                        onChange={this.handleOnChangeDate('birth_date')}
                                        dateFormat="YYYY/MM/DD"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Region</label>
                                    <Select
                                        isLoading={loadingTypes.indexOf('GET_REGIONS') > -1 }
                                        value={ form_data.get('region_code') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('region_code')}
                                        name="region_code"
                                        loadingPlaceholder="Loading..."
                                        options={regions.toJS().map( item => {
                                            return {
                                                label:item.name,
                                                value:item.code
                                            }}
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Province</label>
                                    <Select
                                        isLoading={loadingTypes.indexOf('GET_PROVINCES') > -1 }
                                        value={ form_data.get('province_code') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('province_code')}
                                        name="province_code"
                                        loadingPlaceholder="Loading..."
                                        options={provinces.toJS().map( item => {
                                            return {
                                                label:item.name,
                                                value:item.code
                                            }}
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Municipality</label>
                                    <Select
                                        isLoading={loadingTypes.indexOf('GET_MUNICIPALITIES') > -1 }
                                        value={ form_data.get('municipality_code') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('municipality_code')}
                                        name="municipality_code"
                                        loadingPlaceholder="Loading..."
                                        options={municipalities.toJS().map( item => {
                                            return {
                                                label:item.name,
                                                value:item.code
                                            }}
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Barangay</label>
                                    <Select
                                        isLoading={loadingTypes.indexOf('GET_BARANGAYS') > -1 }
                                        value={ form_data.get('barangay_code') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('barangay_code')}
                                        name="barangay_code"
                                        loadingPlaceholder="Loading..."
                                        options={barangays.toJS().map( item => {
                                            return {
                                                label:item.name,
                                                value:item.code
                                            }}  
                                        )}
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Street</label>
                                    <input type="text" name="street" className="form-control" onChange={this.onChangeInput} value={form_data.get('street')} />
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
                                    <input type="text" name="mobile_number" className="form-control" onChange={this.onChangeInput} value={form_data.get('mobile_number')} />
                                </div>
                            </div>
                            <div className="col-md-6">
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
    const { loadingTypes } = state.loading;
    const form_data = state.branchMembers.get('form_data')
    const regions = state.branchMembers.get('regions')
    const provinces = state.branchMembers.get('provinces')
    const municipalities = state.branchMembers.get('municipalities')
    const barangays = state.branchMembers.get('barangays')
    return {
        loadingTypes,
        form_data,
        regions,
        provinces,
        municipalities,
        barangays,
    };
};

export default withRouter(connect(mapPropsToState)(AddDeductionModal));