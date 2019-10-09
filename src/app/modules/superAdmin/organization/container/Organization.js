/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import OrganizationInfo from '../component/OrganizationInfo';
import * as c from '../constant';
import thumbnail from 'assets/images/500x500.png';

class Organization extends PureComponent {
  
  componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
		dispatch({
			type:c.GET_REGIONS
		})
	}

	onSelectRow = (data) => e => {
    e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
				type:c.GET_DETAIL,
				id:data.get('id')     
		})
	}

  render() {
    const {
      list,
      details
    } = this.props;
    return (
      <Fragment>
      <div className="az-content-header d-block d-md-flex">
          <div>
            <h2 className="az-content-title mg-b-5 mg-b-lg-8">Organization</h2>
            <p className="mg-b-0">Organization Information</p>
          </div>
          <div className="az-dashboard-header-right">
            <div>
              <label className="tx-13">Customer Ratings</label>
              <div className="az-star">
                <i className="typcn typcn-star active"></i>
                <i className="typcn typcn-star active"></i>
                <i className="typcn typcn-star active"></i>
                <i className="typcn typcn-star active"></i>
                <i className="typcn typcn-star"></i>
                <span>(12,775)</span>
              </div>
            </div>
            <div>
              <label className="tx-13">All Sales (Online)</label>
              <h5>431,007</h5>
            </div>
            <div>
              <label className="tx-13">All Sales (Offline)</label>
              <h5>932,210</h5>
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
                  <div key={`organization-${key}`} className={`az-contact-item ${item.get('id') === details.get('id') && 'selected'}`} onClick={this.onSelectRow(item)}>
                    <div className="az-img-user online"><img src={ item.get('photo')|| thumbnail } alt="" /></div>
                    <div className={`az-contact-body `}>
                      <h6 className="text-capitalize">{item.get('name')}</h6>
                      <span className="phone">{ item.get('mobile_number')}</span>
                    </div>
                    <a href="" className={`az-contact-star ${item.get('id') === details.get('id') && 'active'}`}><i className="typcn typcn-star"></i></a>
                  </div>
                )
              })
            }
            </div>
          </div>
          <OrganizationInfo 
            data={details}
          />

        </div>
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
	const superAdminOrganization = state.superAdminOrganization;
	return {
		list : superAdminOrganization.get('list'),
		details : superAdminOrganization.get('details'),
		form_data : superAdminOrganization.get('form_data'),
	};
};

export default withRouter(connect(mapStateToProps)(Organization));
