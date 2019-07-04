/* eslint-disable */
import React, { PureComponent } from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

class SideBar extends PureComponent {

  render() {
    const { location } = this.props;
    const path = location.pathname.split("/")[1];
    const getClassName = name => {
      if (path === name) return "active";
      return "";
    };
    return (
      <>
          <div className="az-sidebar-body">
            <ul className="nav">
              <li className="nav-label">Main Menu</li>
              <li className={`nav-item ${getClassName("")}`}>
                <Link to="/" className="nav-link">
                <i className="typcn typcn-clipboard"></i>Dashboard
                </Link>
              </li>
              <li className={`nav-item ${getClassName("organization")}`}>
                <Link to="/organization" className="nav-link">
                <i className="typcn typcn-book"></i>Organization
                </Link>
              </li>
              <li className={`nav-item ${getClassName("transaction")}`}>
                <Link to="/transaction" className="nav-link">
                <i className="typcn typcn-book"></i>Transaction
                </Link>
              </li>
            </ul>
          </div>
      </>
    );
  }
}
const mapStateToProps = ({api}) => {
  console.log(api)
  return ({
  
})};

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps),
]);

export default enhance(SideBar);
