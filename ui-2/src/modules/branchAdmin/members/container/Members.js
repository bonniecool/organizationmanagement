/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Info from '../component/Info';
import * as actions from '../actions';
import * as c from '../constants';
import thumbnail from 'assets/images/500x500.png';

class Members extends PureComponent {
  

  static propTypes = {
    getList: PropTypes.instanceOf(Function).isRequired,
    getDetails: PropTypes.instanceOf(Function).isRequired,
    list: PropTypes.instanceOf(Array),
    details: PropTypes.instanceOf(Object),
    callback: PropTypes.instanceOf(Object),
    search: PropTypes.instanceOf(Function),
    form_data: PropTypes.instanceOf(Function),
  }

  static defaultProps = {
    list:[],
    details:{}
  }

  componentDidMount = () => {
    const {getOrganization, getDetails } = this.props;
    getOrganization({} , callback => {
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

  handleChange = () => {
    
  }

  search = () => {
    const {getOrganization } = this.props;
    getOrganization({} , callback => {
      if(_.get(callback, 'data').length > 0){
        const id = _.get(callback, 'data[0].id')
        getDetails(id)
      }
    });
  }

  render() {
    const {
      list,
      details
    } = this.props;
    return (
      <Fragment>
        <div className="az-content-header" style={{minHeight: '90px'}}>
          <div className="az-content-header-top">
            <div>
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Members</h2>
              <p className="mg-b-0">List of members</p>
            </div>
            <div className="az-dashboard-date">
              <div className="date">
                <button className="btn btn-primary btn-lg">Add Members</button>
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
              list.map( (item, key) => {
                return(
                  <div key={`member-${key}`} className={`az-contact-item ${_.get(item,'id') === _.get(organizationDetails,'id') && 'selected'}`} onClick={this.handleSelectRow(item)}>
                    <div className="az-img-user online"><img src={ _.get(item,'photo')|| thumbnail } alt="" /></div>
                    <div className={`az-contact-body `}>
                      <h6 className="text-capitalize">{_.get(item, 'name')}</h6>
                      <span className="phone">{_.get(item, 'mobile_number')}</span>
                    </div>
                    <a href="" className={`az-contact-star ${_.get(item,'id') === _.get(organizationDetails,'id') && 'active'}`}><i className="typcn typcn-star"></i></a>
                  </div>
                )
              })
            }
            </div>
          </div>
          <Info 
            data={details}
          />

        </div>
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ api }) => ({
  list: _.get(api, `${c.GET_LIST}.list`) || [],
  details: _.get(api, `${c.GET_DETAILS}.item`) || {},
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
]);

export default enhance(Members);