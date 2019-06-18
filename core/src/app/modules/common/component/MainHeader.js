import React, { PureComponent } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import avatarPlaceholder from "assets/img/avatar-placeholder.jpg";
import Modal from "app/modules/common/component/Modal";
import { IconCadetArrow, IconLogout, IconUser, IconSettings } from "./Icons";

class MainHeader extends PureComponent {
  state = {
    isSearch: false,
    isOpenMenu: false
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "MODAL",
      data: {
        isOpen: true,
        title: "Are you sure you want to log out?",
        content: (
          <div>
            <Modal.Footer>
              <button
                onClick={() => {
                  dispatch({
                    type: "SIGN_OUT"
                  });
                }}
                className="btn btn-md btn-danger"
              >
                LOG OUT
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "MODAL",
                    data: {
                      isOpen: false
                    }
                  });
                }}
                className="btn btn-md btn-outline-danger"
              >
                CANCEL
              </button>
            </Modal.Footer>
          </div>
        )
      }
    });
  };

  handleToggle = e => {
    const { isShinked, dispatch } = this.props;
    dispatch({
      type: "GET_NAV_SIZE",
      data: !isShinked
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({ isSearch: false });
  };

  render() {
    const { profile } = this.props;
    const { isOpenMenu } = this.state;
    return (
      <header className="main-header">
        <nav className="navbar">
          <div
            style={{ display: this.state.isSearch ? "block" : "none" }}
            className="search-box"
          >
            <button onClick={this.handleClose} className="dismiss">
              <i className="fa fa-times" />
            </button>
            <form id="searchForm" action="#" role="search">
              <input
                type="search"
                placeholder="What are you looking for..."
                className="form-control"
              />
            </form>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-end align-content-stretch">
            <div
              className={`${isOpenMenu ? "active" : ""} user-detail`}
              onClick={() => this.setState({ isOpenMenu: !isOpenMenu })}
            >
              <div className="user-info">
                <p className="text-name">
                  {profile.getIn(["profile", "first_name"])}{" "}
                  {profile.getIn(["profile", "middle_name"])}{" "}
                  {profile.getIn(["profile", "last_name"])}
                </p>
                <small className="text-role">
                  {profile.get("profile_type")}
                </small>
              </div>
              <div className="user-thumbnail">
                <div className="avatar -border">
                  <img
                    className="photo"
                    src={profile.get("agency_logo") || avatarPlaceholder}
                    alt="Juan Dela Cruz"
                  />
                </div>
              </div>
              <IconCadetArrow />
              <div className={`${isOpenMenu ? "active" : ""} user-action`}>
                <ul className="action-list list-unstyled">
                  <li className="action-info">
                    <p className="text-name">
                      {profile.getIn(["profile", "first_name"])}
                    </p>
                    <p className="text-email">{profile.get("email")}</p>
                    <p className="text-position">
                      {profile.get("profile_type")}
                    </p>
                  </li>
                  <li className="action-item">
                    <Link to="/profile" type="button" className="action-link with-icon">
                      <IconUser /> Profile
                    </Link>
                  </li>
                  <li className="action-item">
                    <button type="button" className="action-link with-icon">
                      <IconSettings /> Settings
                    </button>
                  </li>
                  <li className="action-item action-logout">
                    <button
                      type="button"
                      className="action-link with-icon logout"
                      onClick={this.handleLogout}
                    >
                      <IconLogout /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  const { isShinked } = state.nav.toJS();
  const { auth } = state;
  return {
    isShinked,
    user_type: auth.get("user_type"),
    profile: auth.get("profile")
  };
};

export default withRouter(connect(mapStateToProps)(MainHeader));
