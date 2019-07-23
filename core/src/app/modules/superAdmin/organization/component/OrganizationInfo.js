/* eslint-disable */
import React, { Component } from 'react';
import _ from 'lodash';
import thumbnail from 'assets/images/500x500.png';

class UserGroups extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="az-content-body az-content-body-contacts">
      <div className="az-contact-info-header">
        <div className="media">
          <div className="az-img-user">
            <img src={ data.get('photo') || thumbnail } alt="" />
            <a href=""><i className="typcn typcn-camera-outline"></i></a>
          </div>
          <div className="media-body">
            <h4>{data.get('name')|| ''}</h4>
            <p>{data.get('uuid') || '-'}</p>
            <nav className="nav">
              <a href="" className="nav-link"><i className="typcn typcn-device-phone"></i> Call</a>
              <a href="" className="nav-link"><i className="typcn typcn-messages"></i> Message</a>
              <a href="" className="nav-link"><i className="typcn typcn-user-add-outline"></i> Add to Group</a>
              <a href="" className="nav-link"><i className="typcn typcn-cancel"></i> Block</a>
            </nav>
          </div>
        </div>
        <div className="az-contact-action">
          <a href=""><i className="typcn typcn-edit"></i> Edit Contact</a>
          <a href=""><i className="typcn typcn-trash"></i> Delete Contact</a>
        </div>
      </div>
      <div className="az-contact-info-body">
        <div className="media-list">
          <div className="media">
            <div className="media-icon"><i className="fas fa-mobile-alt"></i></div>
            <div className="media-body">
              <div>
                <label>Work</label>
                <span className="tx-medium">{data.get('mobile_number')}</span>
              </div>
              <div>
                <label>Other </label>
                <span className="tx-medium">-</span>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-icon align-self-start"><i className="far fa-envelope"></i></div>
            <div className="media-body">
              <div>
                <label>Email Address</label>
                <span className="tx-medium">{data.get('email')|| '-'}</span>
              </div>
              <div>
                <label>Other Email</label>
                <span className="tx-medium">-</span>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-icon"><i className="far fa-map"></i></div>
            <div className="media-body">
              <div>
                <label>Current Address</label>
                <span className="tx-medium">{data.get('barangay_name')|| '-'}, {data.get('barangay_name')|| '-'}, {data.get('municipality_name')|| '-'}, {data.get('province_name')|| '-'}, {data.get('region_name')|| '-'}, {data.get('zip_code')|| '-'}</span>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-icon"><i className="far fa-clock"></i></div>
            <div className="media-body">
              <div>
                <label>Owner</label>
                <a href="#" className="tx-13">{data.get('oganization_owner')|| '-'}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default UserGroups;
