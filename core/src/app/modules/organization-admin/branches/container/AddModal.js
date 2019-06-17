import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
import Select from 'react-select';
import Uploader from 'app/modules/uploadcare/Uploader';
import thumbnail from "assets/img/image-thumbnail.jpg";
import { _ } from 'app/Utils';
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
        const { dispatch, form_data } = this.props;
        dispatch({
            type:c.CREATE,
            args:form_data.toJS()
        })
    }

    uploadPhoto = (key) => (files) => {
        const { dispatch } = this.props
        dispatch({
            type: c.SET_FORM_DATA,
            data: {
                [key]: files
            }
        });
	};

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
                                <div className="col-md-6 offset-md-3">
                                    <div className="col-md-6 offset-md-3">
                                        <div className="employee-photo ml-auto">
                                            <img
                                            src={
                                                !_.isNil(form_data.get('photo'))
                                                ? form_data.get('photo')
                                                : thumbnail
                                            }
                                            alt="..."
                                            className="w-100 img-fluid img-thumbnail"
                                            />
                                        </div>
                                            <Uploader
                                            crop={"400x400"}
                                            label={`${_.isEmpty(form_data.get('photo')) ? 'Upload Photo' : 'Update Photo'}`}
                                            icon={`fa fa-camera`}
                                            onUploaded={ this.uploadPhoto('photo') }/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Organization Name</label>
                                    <input name="name" className="form-control" onChange={this.onChangeInput} value={form_data.get('name')} />
                                </div>
                            </div>
                            <div className="col-md-12">
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
                            <div className="col-md-12">
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
                            <div className="col-md-12">
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
                            <div className="col-md-12">
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
                                    <input type="text" name="number" className="form-control" onChange={this.onChangeInput} value={form_data.get('number')} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control" onChange={this.onChangeInput} value={form_data.get('email')} />
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
    const form_data = state.organizationBranch.get('form_data')
    const regions = state.organizationBranch.get('regions')
    const provinces = state.organizationBranch.get('provinces')
    const municipalities = state.organizationBranch.get('municipalities')
    const barangays = state.organizationBranch.get('barangays')

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