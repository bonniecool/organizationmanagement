import React, { Component } from 'react';
import Modal from 'app/modules/common/component/Modal';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as c from '../constant';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import Uploader from 'app/modules/uploadcare/Uploader';
import thumbnail from "assets/img/image-thumbnail.jpg";
import { _ } from 'app/Utils';

class EditModdal extends Component {

    closeModal = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "MODAL",
            data: {
                isOpen: false
            }
        })
    }


    render() {
        const token = sessionStorage.getItem('token')
        const { data } = this.props;
        return (
            <div>
             <form >
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <iframe src={`${process.env.REACT_APP_END_POINT}/mng/brc/pdf/member/${data.get('uuid')}/print_id?token=${token}`} height="400" width="100%"></iframe>
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

export default withRouter(connect(mapPropsToState)(EditModdal));