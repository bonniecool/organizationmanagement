/* eslint-disable */
import React, { PureComponent } from "react";
import UserGroups from "../../user-list/component/UserGroups";
import TransactionList from "../component/TransactionList";

class TransactionContainer extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 px-0">
            <div className="group-search-container">
              <TransactionList />
            </div>
          </div>
          <div className="col-md-8 pr-0">
            <div className="group-list-button-container">
              <button className="btn btn-main">
                Create Group &nbsp; <i className="fa fa-plus" />
              </button>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-8 group-detail-container">
                <p className="group-title">Data &amp; Analytics </p>
                <p className="group-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  ultricies sollicitudin volutpat. Duis ac massa nec nisl
                  fringilla dignissim vitae nec mi.
                </p>
              </div>
              <div className="col-md-4 text-right">
                <button className="btn btn-secondary justify-content-end">
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
            <div>
              <div className="mt-5">
                <UserGroups />
              </div>
              <div className="card d-flex justify-content-between mt-5 p-2">
                <form className="form-inline d-flex justify-content-between">
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Message to user"
                  />
                  <button className="btn btn-secondary">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionContainer;
