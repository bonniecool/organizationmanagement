/* eslint-disable arrow-body-style */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { IconSearch } from './Icon';

const Sidebar = () => {
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
            <li className="menu-item">
              <NavLink
                to="/user-list"
                className="menu-link"
                activeClassName="current"
              >
                <span className="text">User List</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/groups"
                className="menu-link"
                activeClassName="current"
              >
                <span className="text">Groups</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/services"
                className="menu-link"
                activeClassName="current"
              >
                <span className="text">Services</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                to="/stages"
                className="menu-link"
                activeClassName="current"
              >
                <span className="text">Stages</span>
              </NavLink>
            </li> */}
          </ul>
          <ul className="menu-list">
            <li className="menu-item">
              <span className="title">More Links</span>
            </li>
            <li className="menu-item">
              <NavLink
                to="/analytics"
                className="menu-link"
                activeClassName="current"
              >
                <span className="text">Analytics</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/customers"
                className="menu-link"
                activeClassName="current"
              >
                <span className="text">Customers</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/reports"
                className="menu-link"
                activeClassName="current"
              >
                <span className="text">Reports</span>
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

export default Sidebar;
