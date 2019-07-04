import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconSearch } from '../../common/components/Icon';

class GroupContent extends Component {
  render() {
    return (
      <>
        <div className="header d-flex align-items-center">
          <Link to="/groups/add" className=" ml-auto btn btn-primary rounded-pill">
            Create Group <i className="fas fa-plus" />
          </Link>
        </div>
        <div className="row">
          <div className="col-md-9 group-detail-container">
            <p className="group-title">Group Atheena</p>
            <p className="group-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies sollicitudin
              volutpat. Duis ac massa nec nisl fringilla dignissim vitae nec mi.
            </p>
          </div>
          <div className="col-md-3 d-flex align-items-start justify-content-start align-content-start">
            <button type="button" className=" ml-auto btn btn-sm btn-secondary rounded-pill px-3">
              Edit Details
            </button>
          </div>
        </div>
        <div className="group-status-container">
          <span className="badge badge-main align-middle">ACTIVE</span>
          <label className="switch align-middle mb-0 ml-3">
            <input type="checkbox" />
            <span className="slider" />
          </label>
        </div>
        <div className="search-listing-wrapper">
          <form action="" className="mb-3">
            <div className="inner-addon left-addon right-addon-button">
              <IconSearch />
              <input
                type="text"
                placeholder="Search..."
                className="form-control normal border-black with-icon"
              />
              <button className="btn btn-right" type="button">
                <i className="fas fa-plus" />
              </button>
            </div>
          </form>
          <div className="group-list-container">
            <h3 className="group-list-title">Users on this Group(5)</h3>
            <ul className="list-group">
              <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                Lucinda Bowman
                <span className="group-list-remove">Remove</span>
              </li>
              <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                Theresa Collier
              </li>
              <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                Mayme Marsh
              </li>
              <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                Mollie Stevens
              </li>
              <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                Fred Poole
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default GroupContent;
