import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import logo from "assets/img/logo.svg";
import Select from 'react-select';
import * as c from '../constant';
class SignInContainer extends Component {
  state = {
    email: "",
    password: ""
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
			type:c.GET_REGIONS
		})
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

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

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form_data } = this.props;
    dispatch({
      type: "REGISTER",
      args:{
        barangay_code:form_data.get('barangay_code'),
        municipality_code:form_data.get('municipality_code'),
        name:form_data.get('name'),
        province_code:form_data.get('province_code'),
        region_code:form_data.get('region_code'),
        street:form_data.get('street'),
        zip_code:form_data.get('zip_code'),
    }
    });
  };

  render() {
    const { isLoading, isAuthenticated, form_data, loadingTypes, regions,
      provinces,
      municipalities,
      barangays, } = this.props;

    if (isAuthenticated) return <Redirect to="/" />;

    return (
      <div className="page login-page">
        <div className="login-card">
          <div className="login-form">
            <div className="login-container">
              <img className="logo" src={logo} alt="Who's In" />
              
              <h3 className="login-title">
                Fill the required Fields
              </h3>
              <form
                id="login-form"
                onSubmit={this.handleSubmit}
                autoComplete="off"
              >
              <div className="row">
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
            </div>
                <button
                  disabled={isLoading}
                  id="login"
                  className="btn btn-login btn-success btn-block"
                >
                  Sign Up
                </button>
              </form>
              
            </div>
          </div>
          <div className="login-details" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  const { loadingTypes } = state.loading;
  const isAuthenticated = state.auth.get("isAuthenticated");
  const form_data = state.auth.get("form_data");
  const regions = state.organizationBranch.get('regions')
  const provinces = state.organizationBranch.get('provinces')
  const municipalities = state.organizationBranch.get('municipalities')
  const barangays = state.organizationBranch.get('barangays')

  return {
    isLoading: loadingTypes.length > 0,
    loadingTypes,
    isAuthenticated,
    form_data,
    regions,
    provinces,
    municipalities,
    barangays,
  };
};

export default withRouter(connect(mapStateToProps)(SignInContainer));
