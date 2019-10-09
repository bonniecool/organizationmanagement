import React, { Component } from 'react';

class UserGroups extends Component {
  render() {
    return (
      <>
        <div className="group-list-container">
          <h3 className="group-list-title">Available Groups</h3>
          <ul className="list-group">
            <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
              Lucinda Bowman
              <span className="group-list-remove">
                Add to Group &nbsp;
                <i className="fa fa-plus" />
              </span>
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
      </>
    );
  }
}

export default UserGroups;
