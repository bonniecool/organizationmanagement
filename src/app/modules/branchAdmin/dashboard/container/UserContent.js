import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import userImage from 'assets/images/user-placeholder.png';
import PropTypes from 'prop-types';
import Uploader from 'modules/common/components/Uploader';
import UserGroups from '../component/UserGroups';
import * as actions from '../actions';
import * as c from '../constants';

class UserContent extends PureComponent {
  static propTypes = {
    getSelectedUser: PropTypes.instanceOf(Function).isRequired,
    userId: PropTypes.string.isRequired,
    selectedUser: PropTypes.instanceOf(Object).isRequired,
  }

  static defaultProps = {}

  componentDidMount = () => {
    this.onGetSelectedUser();
  }

  componentDidUpdate = (props) => {
    const { userId } = this.props;
    if (!_.isEqual(userId, props.userId)) {
      this.onGetSelectedUser();
    }
  }

  onGetSelectedUser = () => {
    const { userId, getSelectedUser } = this.props;
    getSelectedUser(userId);
  }

  render() {
    const { selectedUser } = this.props;

    return (
      <>
        <div className="header d-flex align-items-center">
          <Link to="/user-list/add" className=" ml-auto btn btn-primary rounded-pill">
            Create User <i className="fas fa-plus" />
          </Link>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="user-details-wrapper">
              <div className="user-details-image-wrapper">
                <img
                  className="user-image"
                  src={_.get(selectedUser, 'profile.photo') || userImage}
                  alt="UserImage"
                />
                <button type="button" className="btn btn-secondary mt-2">
                  Upload Photo
                </button>
                <Uploader
                  className="btn btn-secondary mt-2"
                  label="Upload Photo"
                />
              </div>
              <div>
                <p className="user-name">{_.get(selectedUser, 'profile.full_name', '') || '--'}</p>
                <p className="group-name">{_.get(selectedUser, 'profile_type', '') || '--'}</p>
                <div className="group-status-container">
                  <span className="badge badge-main">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-flex align-items-start justify-content-start align-content-start">
            <Link
              to="/user-list/edit"
              className=" ml-auto btn btn-sm btn-secondary rounded-pill px-3"
            >
              Edit Credentials &nbsp;
              <i className="fa fa-pencil" />
            </Link>
          </div>
        </div>
        <div className="user-information-wrapper mt-3">
          <div className="row mt-1">
            <div className="col-md-4">
              <p className="user-information-label">First Name</p>
              <p>{_.get(selectedUser, 'profile.first_name', '') || '--'}</p>
            </div>
            <div className="col-md-4">
              <p className="user-information-label">Middle Name</p>
              <p>{_.get(selectedUser, 'profile.middle_name', '') || '--'}</p>
            </div>
            <div className="col-md-4">
              <p className="user-information-label">Last Name</p>
              <p>{_.get(selectedUser, 'profile.last_name', '') || '--'}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p className="user-information-label">Gender</p>
              <p>{_.get(selectedUser, 'profile.gender', '') || '--'}</p>
            </div>
            <div className="col-md-4">
              <p className="user-information-label">Mobile Number</p>
              <p>{_.get(selectedUser, 'profile.mobile_no', '') || '--'}</p>
            </div>
            <div className="col-md-4">
              <p className="user-information-label">Email</p>
              <p>{_.get(selectedUser, 'email', '') || '--'}</p>
            </div>
          </div>
          <UserGroups />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ api }, { match }) => ({
  userId: _.get(match, 'params.userId'),
  selectedUser: _.get(api, `${c.GET_SELECTED_USER_BY_ID}.item`) || {},
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
]);

export default enhance(UserContent);
