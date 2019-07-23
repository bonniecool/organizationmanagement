/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import BranchInfo from '../component/BranchInfo';
import AddModal from './AddModal';
import * as actions from '../actions';
import * as c from '../constants';
import thumbnail from 'assets/images/500x500.png';

class Branches extends PureComponent {
  

  static propTypes = {
    getBranches: PropTypes.instanceOf(Function).isRequired,
    getDetails: PropTypes.instanceOf(Function).isRequired,
    branchList: PropTypes.instanceOf(Array).isRequired,
    branchDetails: PropTypes.instanceOf(Object).isRequired,
    callback: PropTypes.instanceOf(Object),
    search: PropTypes.instanceOf(Function),
    form_data: PropTypes.instanceOf(Function),
    addModal: PropTypes.instanceOf(Function),
  }


  static contextTypes = {
    setModal: PropTypes.instanceOf(Function).isRequired,
  };

  static defaultProps = {
    branchList:[],
    branchDetails:{}
  }

  componentDidMount = () => {
    const { getBranches, getDetails } = this.props;
    getBranches({} , callback => {
      if(_.get(callback, 'data').length > 0){
        const id = _.get(callback, 'data[0].id')
        getDetails(id)
      }
    });
  }


  handleSelectRow = ({ id }) => e => {
    e.preventDefault();
    this.props.getDetails(id);

  };

  search = () => {
    const { getBranches } = this.props;
    getBranches({} , callback => {
      if(_.get(callback, 'data').length > 0){
        const id = _.get(callback, 'data[0].id')
        getDetails(id)
      }
    });
  }

  handleAddModal = (e) => {
    e.preventDefault();
    const { setModal } = this.context;
    setModal({
      isOpen: true,
      content: (
        <AddModal

        />
      ),
      title: 'Add Branch',
      modalSize: 'modal-lg',
    });
  };


  render() {
    const {
      branchList,
      branchDetails
    } = this.props;
    return (
      <Fragment>
        <div className="az-content-header" style={{minHeight: '90px'}}>
          <div className="az-content-header-top">
            <div>
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Branch</h2>
              <p className="mg-b-0">List of organization branches</p>
            </div>
            <div className="az-dashboard-date">
              <div className="date">
                <button className="btn btn-primary btn-lg" onClick={this.handleAddModal}>Create Branch</button>
              </div>
            </div>
          </div>
        </div>
      <div className="az-content az-content-app az-content-contacts pd-b-0 mt-3">
        <div className="container">
          <div className="az-content-left az-content-left-contacts">

          <div className="az-content-breadcrumb lh-1 mg-b-2">
            <div className="col-lg-12 mg-t-20 mg-lg-t-0 mb-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                <span className="btn-group btn-group-sm input-group-btn">
                  <button className="btn btn-outline-primary " type="button"><i className="fa fa-search"></i></button>
                </span>
              </div>
            </div>
          </div>
            <div id="azContactList" className="az-contacts-list pre-scrollable">
            {
              branchList.map( (item, key) => {
                return(
                  <div key={`branch-${key}`} className={`az-contact-item ${_.get(item,'id') === _.get(branchDetails,'id') && 'selected'}`} onClick={this.handleSelectRow(item)}>
                    <div className="az-img-user online"><img src={ _.get(item,'photo')|| thumbnail } alt="" /></div>
                    <div className={`az-contact-body `}>
                      <h6 className="text-capitalize">{_.get(item, 'name')}</h6>
                      <span className="phone">{_.get(item, 'mobile_number')}</span>
                    </div>
                    <a href="" className={`az-contact-star ${_.get(item,'id') === _.get(branchDetails,'id') && 'active'}`}><i className="typcn typcn-star"></i></a>
                  </div>
                )
              })
            }
            </div>
          </div>
          <BranchInfo 
            data={branchDetails}
            
          />

        </div>
      </div>
      </Fragment>
    );
  }
}


const mapStateToProps = ({ api }) => ({
  branchList: _.get(api, `${c.GET_LIST}.list`) || [],
  branchDetails: _.get(api, `${c.GET_DETAILS}.item`) || {},
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
]);

export default enhance(Branches);