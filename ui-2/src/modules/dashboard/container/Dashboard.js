/* eslint-disable */
import React, { PureComponent } from 'react';
import SalesChart from '../component/SalesChart';
import CustomersChart from '../component/CustomersChart';
import { NavLink } from 'react-router-dom';

import imageCover from 'assets/images/ads.jpg';
class Dashboard extends PureComponent {
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-9 px-0">
              <div className="row">
                <div className="col-12">
                  <div className="card card-chart large chart-top-services">a</div>
                </div>
                <div className="col-6">
                  <div className="card card-chart small chart-sale">
                    <div className="header d-flex justify-content-between">
                      <h3 className="title mr-auto">Sales (In ₱)</h3>
                    </div>
                    <div className="average-price">
                      <h2 className="price">₱ 25,048,938.92</h2>
                    </div>
                    <SalesChart />
                  </div>
                </div>
                <div className="col-6">
                  <div className="card card-chart small chart-customer">
                    <div className="header d-flex justify-content-between">
                      <h3 className="title mr-auto">Customers</h3>
                    </div>
                    <div className="average-price">
                      <h2 className="price">1,380,937</h2>
                    </div>
                    <CustomersChart />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 pr-0">
              <div className="card card-links full">
                <div className="image-cover">
                  <img className="image" src={imageCover} alt="Netflix" />
                </div>
                <div className="quick-links">
                  <ul className="quick-list">
                    <li className="menu-item">
                      <span className="title">Quick Links</span>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/user-list"
                        className="menu-link d-flex justify-content-between"
                        activeClassName="current"
                      >
                        <span className="text">Create User</span>
                        <i className="icon fas fa-plus" />
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/user-list"
                        className="menu-link d-flex justify-content-between"
                        activeClassName="current"
                      >
                        <span className="text">Create Groups</span>
                        <i className="icon fas fa-plus" />
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/user-list"
                        className="menu-link d-flex justify-content-between"
                        activeClassName="current"
                      >
                        <span className="text">Create Services</span>
                        <i className="icon fas fa-plus" />
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/user-list"
                        className="menu-link d-flex justify-content-between"
                        activeClassName="current"
                      >
                        <span className="text">Create Stages</span>
                        <i className="icon fas fa-plus" />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
