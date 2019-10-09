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
                <Link to="/branch" className={`nav-link ${getClassName("branch")}`}>
                  <i className="typcn typcn-document"></i>Branch
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link to="/transaction" className={`nav-link ${getClassName("transaction")}`}>
                  <i className="typcn typcn-book"></i>Transaction
                </Link>
              </li>
              <li className={`nav-item `}>
                <Link to="/wallet" className={`nav-link ${getClassName("wallet")}`}>
                  <i className="typcn typcn-edit"></i>Wallet
                </Link>
              </li>

            </ul>
          </div>
        </div>
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
