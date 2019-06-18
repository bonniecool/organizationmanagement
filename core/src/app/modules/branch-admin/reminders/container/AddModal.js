import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';

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

    onSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form_data } = this.props;
        dispatch({
            type:c.CREATE,
            args:{
                subject:form_data.get('subject'),
                content:form_data.get('content'),
                status:form_data.get('status'),
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