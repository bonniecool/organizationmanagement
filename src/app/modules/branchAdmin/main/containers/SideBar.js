/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from './Header';

class SideBar extends PureComponent {

  render() {
    const { location } = this.props;
    const path = location.pathname.split("/")[1];
    const getClassName = name => {
      if (path === name) return "font-weight-bold text-light";
      return "";
    };
    return (
      <Fragment>
        <div className="az-sidebar az-sidebar-sticky az-sidebar-indigo-dark">
          <Header />
          <div className="az-sidebar-body">
            <ul className="nav">
              <li className="nav-label">Main Menu</li>
              <li className={`nav-item `}>
                <Link to="/" className={`nav-link ${getClassName("")}`}>
                  <i className="typcn typcn-clipboard"></i>Dashboard
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link to="/members" className={`nav-link ${getClassName("members")}`}>
                  <i className="typcn typcn-document"></i>Members
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link to="/attendance" className={`nav-link ${getClassName("attendance")}`}>
                  <i className="typcn typcn-book"></i>Attendance
                </Link>
              </li>
              <li className={`nav-item `}>
                <Link to="/reminders" className={`nav-link ${getClassName("reminders")}`}>
                  <i className="typcn typcn-edit"></i>Reminders
                </Link>
              </li>
              <li className={`nav-item `}>
                <Link to="/qr-code" className={`nav-link ${getClassName("qr-code")}`}>
                  <i className="typcn typcn-edit"></i>QR Code
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({api}) => {
  return ({
  
})};

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps),
]);

export default enhance(SideBar);
