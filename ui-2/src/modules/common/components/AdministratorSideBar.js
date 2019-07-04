/* eslint-disable arrow-body-style */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { IconSearch } from './Icon';

const AdministratorSideBar = () => {
  return (
    <aside className="main-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-menu mt-5">
          <ul className="menu-list">
            <li className="menu-item">
              <span className="title">Menu</span>
            </li>
            <li className="menu-item">
              <NavLink
                exact
                to="/dashboard"
                className="menu-link"
                activeClassName="current"
              >
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="copyright">
          <span className="copyright-text">&copy; ePLDT Marketplace</span>
          <Link to="/" className="help-link">
            Help?
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AdministratorSideBar;
