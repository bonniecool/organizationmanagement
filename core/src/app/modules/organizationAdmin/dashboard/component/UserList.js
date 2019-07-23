import React, { PureComponent } from 'react';

class UserList extends PureComponent {
  render() {
    return (
      <div className="user-listing">
        <div className="user-item selected">
          <div className="thumbnail">
            <img
              className="user-photo rounded-circle"
              src="//randomuser.me/api/portraits/men/55.jpg"
              alt="Darrell Cox"
            />
          </div>
          <div className="user-info">
            <p className="user-group">Group Atheena</p>
            <p className="user-fullname">Darrell Cox</p>
          </div>
        </div>
        <div className="user-item">
          <div className="thumbnail">
            <img
              className="user-photo rounded-circle"
              src="//randomuser.me/api/portraits/women/34.jpg"
              alt="Ellen Harper"
            />
          </div>
          <div className="user-info">
            <p className="user-group">Group Hermes</p>
            <p className="user-fullname">Ellen Harper</p>
          </div>
        </div>
        <div className="user-item">
          <div className="thumbnail">
            <img
              className="user-photo rounded-circle"
              src="//randomuser.me/api/portraits/women/68.jpg"
              alt="Carmen Montgomery"
            />
          </div>
          <div className="user-info">
            <p className="user-group">Group Felonius</p>
            <p className="user-fullname">Carmen Montgomery</p>
          </div>
        </div>
        <div className="user-item">
          <div className="thumbnail">
            <img
              className="user-photo rounded-circle"
              src="//randomuser.me/api/portraits/men/77.jpg"
              alt="Bruce Palmer"
            />
          </div>
          <div className="user-info">
            <p className="user-group">Group Hercules</p>
            <p className="user-fullname">Bruce Palmer</p>
          </div>
        </div>
        <div className="user-item">
          <div className="thumbnail">
            <img
              className="user-photo rounded-circle"
              src="//randomuser.me/api/portraits/men/40.jpg"
              alt="Ray Ellis"
            />
          </div>
          <div className="user-info">
            <p className="user-group">Group Artemis</p>
            <p className="user-fullname">Ray Ellis</p>
          </div>
        </div>
        <div className="user-item">
          <div className="thumbnail">
            <img
              className="user-photo rounded-circle"
              src="//randomuser.me/api/portraits/men/24.jpg"
              alt="Norman Rhodes"
            />
          </div>
          <div className="user-info">
            <p className="user-group">Group Poseido</p>
            <p className="user-fullname">Norman Rhodes</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
