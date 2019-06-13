import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";


class Home extends Component {

  render() {
    const { match, isShinked, user_type } = this.props;
    return (
      <div className="page home-page">
        <div>Header</div>
        <div>Sidebar</div>
        <div>Main</div>
        <div>Foooter</div>
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

export default withRouter(connect(mapStateToProps)(Home));
