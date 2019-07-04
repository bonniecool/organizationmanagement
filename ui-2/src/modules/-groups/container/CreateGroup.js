import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../common/components/EmptyState';

class CreateGroup extends PureComponent {
  render() {
    return (
      <>
        <div className="header d-flex align-items-center">
          <Link to="/groups" className="ml-auto btn btn-light rounded-pill">
            Cancel
          </Link>
          <Link to="/groups" className="ml-2 btn btn-primary rounded-pill">
            Save
          </Link>
        </div>
        <div>
          <div className="group-detail-container">
            <p className="create-group-title">
              Group Name <span className="create-group-required">*</span>
            </p>
            <input type="text" className="form-control" />
            <p className="create-group-title mt-2">
              Description <span className="create-group-required">*</span>
            </p>
            <textarea className="form-control" rows="4" />
          </div>
        </div>
        <div className="search-listing-wrapper mt-5">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text search-listing-icon">
                  <i className="fa fa-search" />
                </span>
              </div>
              <input
                type="text"
                className="form-control search-listing-input"
                placeholder="Search and Add user"
              />
              <div className="input-group-append">
                <span className="input-group-text search-listing-add">
                  <i className="fa fa-plus" />
                </span>
              </div>
            </div>
          </form>
          <div className="group-list-container">
            <h3 className="group-list-title">Users on this Group(0)</h3>
            <p>You can add users to this group.</p>
            <EmptyState />
          </div>
        </div>
      </>
    );
  }
}

export default CreateGroup;
