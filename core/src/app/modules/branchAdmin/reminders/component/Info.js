/* eslint-disable */
import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment-timezone';

class UserGroups extends Component {
  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <div className="az-content-body az-content-body-contacts pl-0">
          <div className="az-contact-info-header pl-0">
            <div className="media">
              <div className="media-body">
                <h4>{data.get('subject')}</h4>
                <p>Date Expired : {data.get('expiration_date') ? moment(data.get('expiration_date')).format('YYYY-MM-DD') : ''}</p>
              </div>
            </div>
            <div className="az-contact-action">
              <a href=""><i className="typcn typcn-edit"></i> Edit Contact</a>
              <a href=""><i className="typcn typcn-trash"></i> Delete Contact</a>
            </div>
          </div>
          <div className="az-contact-info-body pl-3" style={{height:'250px',overflowY:'scroll'}}>
            <div className="media-list">
              <div className="col-md-12">
              {
                data.get('image') &&
                <img src={data.get('image')} className="float-left employee-photo m-2"/>
              }
              <p>{data.get('content')}</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserGroups;
