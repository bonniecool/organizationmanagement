/* eslint-disable */
import React, { PureComponent } from "react";

class TransactionList extends PureComponent {
  render() {
    return (
      <div>
        <div className="group-list-form-wrapper">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text search-listing-icon">
                  <i className="fa fa-search" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search user..."
              />
            </div>
          </form>
          <p className="total-group-title">Transaction Ticket (8)</p>
        </div>
        <ul className="list-group">
          <li className="list-group-item group-list-items d-flex justify-content-between">
            <div className="d-flex">
              <p>001 </p>
              <p className="d-flex flex-column ml-5">
                <span className="badge badge-main">Open</span> Services 1
              </p>
            </div>
            <div>
              <span className="badge btn-secondary">Process</span>
            </div>
          </li>
          <li className="list-group-item group-list-items d-flex justify-content-between">
            <div className="d-flex">
              <p>002 </p>
              <p className="d-flex flex-column ml-5">
                <span className="badge badge-main">Open</span> Services 1
              </p>
            </div>
            <div>
              <span className="badge btn-secondary">Approve</span>
            </div>
          </li>
          <li className="list-group-item group-list-items d-flex justify-content-between">
            <div className="d-flex">
              <p>003 </p>
              <p className="d-flex flex-column ml-5">
                <span className="badge badge-main">Open</span> Services 1
              </p>
            </div>
            <div>
              <span className="badge btn-secondary">Process</span>
            </div>
          </li>
          <li className="list-group-item group-list-items d-flex justify-content-between">
            <div className="d-flex">
              <p>004 </p>
              <p className="d-flex flex-column ml-5">
                <span className="badge badge-success">Open</span> Services 1
              </p>
            </div>
            <div>
              <span className="badge btn-secondary">Closed</span>
            </div>
          </li>
          <li className="list-group-item group-list-items d-flex justify-content-between">
            <div className="d-flex">
              <p>005 </p>
              <p className="d-flex flex-column ml-5">
                <span className="badge badge-success">Open</span> Services 1
              </p>
            </div>
            <div>
              <span className="badge badge-main">Process</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default TransactionList;
