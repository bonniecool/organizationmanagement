/* eslint-disable */
import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import thumbnail from 'assets/images/500x500.png';

class UserGroups extends Component {
  render() {
    const { data } = this.props;

    return (
      <Fragment>
      <div className="az-content-body az-content-body-contacts">
      <div className="az-contact-info-header">
        <div className="media">
          <div className="az-img-user">
            <img src={ data.get('photo')|| thumbnail } alt="" />
            <a href=""><i className="typcn typcn-camera-outline"></i></a>
          </div>
          <div className="media-body">
            <h4>{data.get('last_name')} {data.get('suffix')}, {data.get('first_name')} {data.get('middle_name')}</h4>
            <p>{data.get('uuid') || '-'}</p>
            <nav className="nav">
              <a href="" className="nav-link"><i className="typcn typcn-device-phone"></i> Call</a>
              <a href="" className="nav-link"><i className="typcn typcn-messages"></i> Message</a>
            </nav>
          </div>
        </div>
        <div className="az-contact-action">
          <a href=""><i className="typcn typcn-edit"></i> Edit Member</a>
          <a href=""><i className="typcn typcn-trash"></i> Delete Member</a>
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
            </div>
          </div>
          <div className="media">
            <div className="media-icon align-self-start"><i className="far fa-envelope"></i></div>
            <div className="media-body">
              <div>
                <label>Email Address</label>
                <span className="tx-medium">{data.get('email')|| '-'}</span>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-icon"><i className="far fa-map"></i></div>
            <div className="media-body">
              <div>
                <label>Current Address</label>
                <span className="tx-medium">{data.get('barangay')|| '-'}, {data.get('municipality')|| '-'}, {data.get('province')|| '-'}, {data.get('region')|| '-'}, {data.get('zip_code')|| '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </Fragment>
    );
  }
}

export default UserGroups;
