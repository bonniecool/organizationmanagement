import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import { _ } from 'app/Utils';
import Uploader from 'app/modules/uploadcare/Uploader';
import thumbnail from "assets/img/image-thumbnail.jpg";

class AddModal extends Component {


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


    uploadPhoto = (key) => (files) => {
        const { dispatch } = this.props
        dispatch({
            type: c.SET_FORM_DATA,
            data: {
                [key]: files
            }
        });
	};

    onSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form_data } = this.props;
        dispatch({
            type:c.CREATE,
            args:{
                subject:form_data.get('subject'),
                content:form_data.get('content'),
                status:form_data.get('status'),
                image:form_data.get('image'),
                expiration_date:moment(form_data.get('expiration_date')).format('YYYY-MM-DD'),
            }
            
        })
    }

    render() {
        const { form_data } = this.props;
        const status = [
			{label:'ACTIVE', value:'1'},
			{label:'IN-ACTIVE', value:'0'},
		]
        return (
            <div>
             <form onSubmit={ this.onSubmit }>
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                <div className="col-md-6 offset-md-3">
                                    <div className="employee-photo ">
                                        <div className="ml-auto">
                                        <img
                                            src={
                                            !_.isNil(form_data.get('image'))
                                                ? form_data.get('image')
                                                : thumbnail
                                            }
                                            alt="..."
                                            className="w-100 img-fluid img-thumbnail"
                                        />
                                        </div>
                                        <Uploader
                                            crop={"400x400"}
                                            label={`${_.isEmpty(form_data.get('image')) ? 'Upload Image' : 'Update Image'}`}
                                            icon={`fa fa-camera`}
                                            onUploaded={ this.uploadPhoto('image') }/>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input name="subject" className="form-control" onChange={this.onChangeInput} value={form_data.get('subject')} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea type="number" name="content" className="form-control" rows="5" onChange={this.onChangeInput} value={form_data.get('content')} >
                                    </textarea>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <DatePicker
                                        required
                                        selected={form_data.get('expiration_date')}
                                        name="expiration_date"
                                        onChange={this.handleOnChangeDate('expiration_date')}
                                        dateFormat="YYYY/MM/DD"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Status</label>
                                    <Select
                                        value={ form_data.get('status') }
                                        simpleValue
                                        onChange={this.handleChangeSelect('status')}
                                        name="status"
                                        loadingPlaceholder="Loading..."
                                        options={status}
                                    required/>
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
    return {
        form_data
    };
};

export default withRouter(connect(mapPropsToState)(AddModal));