import React, { Component } from "react";
import logo from "assets/img/logo-white.svg";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import {
  IconHome,
  IconMembers,
  IconAttendance,
  IconReminders,
} from "./Icons";

class SidebarNavigation extends Component {
  state = {
    isOpenDropdown: false
  };

  componentDidMount() {
    document.body.addEventListener("click", this.handleClickBody);
  }

  handleClickBody = e => {
    if (!_.has(e.target.attributes["data-toggle"])) {
      this.setState({
        isOpenDropdown: false
      });
    }
  };

  handleToggle = e => {
    const { isShinked, dispatch } = this.props;
    dispatch({
      type: "GET_NAV_SIZE",
      data: !isShinked
    });
  };

  render() {
    const { isShinked, location } = this.props;
    const path = location.pathname.split("/")[1];

    const getClassName = name => {
      if (path === name) return "active";
      return "";
    };
    return (
      <nav className={`sidebar-navigation ${!isShinked && "shrinked"}`}>
        <div className="sidebar-header">
          <div
            style={{ display: isShinked ? "block" : "none" }}
            className="mr-auto"
          >
            <img className="brand-logo" src={logo} alt="Who's In" />
          </div>
          <a
            onClick={this.handleToggle}
            id="toggle-btn"
            className={`brand-menu brand-menu-icon ${!isShinked && "active"}`}
          >
            <span />
            <span />
            <span />
          </a>
        </div>
        <div className="sidebar-menu-list">
          <ul className="sidebar-list list-unstyled">
            <li
              className={`sidebar-menu ${getClassName("")}`}
              data-tooltip="Dashboard"
            >
              <Link to="/" className="link collapsed">
                <IconHome /> <span className="menu-text">Dashboard</span>
              </Link>
            </li>
          </ul>
          <span className="sidebar-title">Branch</span>
          <ul className="sidebar-list list-unstyled">
            <li className={`sidebar-menu ${getClassName("members")}`}>
              <Link to="/members" className="link collapsed">
                <IconMembers />
                <span className="menu-text">Members</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("attendance")}`}>
              <Link to="/attendance" className="link collapsed">
                <IconAttendance /> <span className="menu-text">Attendance</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("reminders")}`}>
              <Link to="/reminders" className="link collapsed">
                <IconReminders /> <span className="menu-text">Reminders</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="sidebar-poweredby"
          style={{ display: !isShinked ? "block" : "none" }}
        />
        <div
          className="sidebar-poweredby"
          style={{ display: isShinked ? "block" : "none" }}
        />
      </nav>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  const { isShinked } = state.nav.toJS();
  const { auth } = state;

  return {
    isShinked,
    profile: auth.get("profile"),
    user_type: auth.get("user_type")
  };
};

export default withRouter(connect(mapStateToProps)(SidebarNavigation));
