/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import logo from 'assets/images/logo.svg';
import _ from 'lodash';
import thumbnail from 'assets/images/500x500.png';

class Header extends PureComponent {

  render() {
    const profile = JSON.parse(sessionStorage.getItem('profile'))
    const profileType = sessionStorage.getItem('profile_type')
    return (
      <Fragment>
        <div className="az-sidebar-header">
          <a href="index.html" className="az-logo"><img src={logo} width="141" height="32" /></a>
        </div>
        <div className="az-sidebar-loggedin">
          <div className="az-img-user online"><img src={_.get(profile,'photo') || thumbnail} alt="" /></div>
          <div className="media-body">
          <h6>{_.get(profile,'full_name')}</h6>
          <span>{profileType}</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
