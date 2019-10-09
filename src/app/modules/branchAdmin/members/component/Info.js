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
<<<<<<< HEAD
            <img src={ _.get(data,'photo')|| thumbnail } alt="" />
            <a href=""><i className="typcn typcn-camera-outline"></i></a>
          </div>
          <div className="media-body">
            <h4>{_.get(data,'name')|| ''}</h4>
            <p>{_.get(data,'uuid') || '-'}</p>
            <nav className="nav">
              <a href="" className="nav-link"><i className="typcn typcn-device-phone"></i> Call</a>
              <a href="" className="nav-link"><i className="typcn typcn-messages"></i> Message</a>
              <a href="" className="nav-link"><i className="typcn typcn-user-add-outline"></i> Add to Group</a>
              <a href="" className="nav-link"><i className="typcn typcn-cancel"></i> Block</a>
=======
            <img src={ data.get('photo')|| thumbnail } alt="" />
            <a href=""><i className="typcn typcn-camera-outline"></i></a>
          </div>
          <div className="media-body">
            <h4>{data.get('last_name')} {data.get('suffix')}, {data.get('first_name')} {data.get('middle_name')}</h4>
            <p>{data.get('uuid') || '-'}</p>
            <nav className="nav">
              <a href="" className="nav-link"><i className="typcn typcn-device-phone"></i> Call</a>
              <a href="" className="nav-link"><i className="typcn typcn-messages"></i> Message</a>
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
            </nav>
          </div>
        </div>
        <div className="az-contact-action">
<<<<<<< HEAD
          <a href=""><i className="typcn typcn-edit"></i> Edit Contact</a>
          <a href=""><i className="typcn typcn-trash"></i> Delete Contact</a>
=======
          <a href=""><i className="typcn typcn-edit"></i> Edit Member</a>
          <a href=""><i className="typcn typcn-trash"></i> Delete Member</a>
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
        </div>
      </div>
      <div className="az-contact-info-body">
        <div className="media-list">
          <div className="media">
            <div className="media-icon"><i className="fas fa-mobile-alt"></i></div>
            <div className="media-body">
              <div>
                <label>Work</label>
<<<<<<< HEAD
                <span className="tx-medium">{_.get(data,'mobile_number')}</span>
              </div>
              <div>
                <label>Other </label>
                <span className="tx-medium">-</span>
=======
                <span className="tx-medium">{data.get('mobile_number')}</span>
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-icon align-self-start"><i className="far fa-envelope"></i></div>
            <div className="media-body">
              <div>
                <label>Email Address</label>
<<<<<<< HEAD
                <span className="tx-medium">{_.get(data,'email')|| '-'}</span>
              </div>
              <div>
                <label>Other Email</label>
                <span className="tx-medium">-</span>
=======
                <span className="tx-medium">{data.get('email')|| '-'}</span>
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-icon"><i className="far fa-map"></i></div>
            <div className="media-body">
              <div>
                <label>Current Address</label>
<<<<<<< HEAD
                <span className="tx-medium">{_.get(data,'barangay_name')|| '-'}, {_.get(data,'barangay_name')|| '-'}, {_.get(data,'municipality_name')|| '-'}, {_.get(data,'province_name')|| '-'}, {_.get(data,'region_name')|| '-'}, {_.get(data,'zip_code')|| '-'}</span>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-icon"><i className="far fa-clock"></i></div>
            <div className="media-body">
              <div>
                <label>Owner</label>
                <a href="#" className="tx-13">{_.get(data,'oganization_owner')|| '-'}</a>
=======
                <span className="tx-medium">{data.get('barangay')|| '-'}, {data.get('municipality')|| '-'}, {data.get('province')|| '-'}, {data.get('region')|| '-'}, {data.get('zip_code')|| '-'}</span>
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
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
