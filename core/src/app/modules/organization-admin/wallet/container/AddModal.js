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
            type: c.CLEAR_FORM_DATA
        })

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
            args:{
                amount:form_data.get('amount')
            }
        })
    }

    render() {
        const { form_data } = this.props;
        return (
            <div>
             <form onSubmit={ this.onSubmit }>
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-center display-4">
                                    {form_data.get('refno')}
                                </div>
                                <div className="text-center">
                                    <p>{form_data.get('message')}</p>
                                </div>
                                {
                                    form_data.get('refno') === '' &&
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input name="amount" className="form-control" onChange={this.onChangeInput} value={form_data.get('amount')} />
                                    </div>
                                }
                                
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
    const form_data = state.organizationWallet.get('form_data')
    console.log(form_data.toJS())
    return {
        form_data
    };
};

export default withRouter(connect(mapPropsToState)(AddDeductionModal));