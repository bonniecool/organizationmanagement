import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";
import './style.css';

class Header extends Component {

  render() {
    const { match, isShinked, user_type } = this.props;
    return (
      <div id="header">
        Heaader
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  const { isShinked } = state.nav.toJS();
  const { auth } = state;

  return {
    isShinked,
    user_type: auth.get("user_type")
  };
};

export default withRouter(connect(mapStateToProps)(Header));
