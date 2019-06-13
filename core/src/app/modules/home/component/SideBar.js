import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";


class Sidebar extends Component {

  render() {
    const { match, isShinked, user_type } = this.props;
    return (
      <div id="sidebar">

      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  return {
    isShinked,
  };
};

export default withRouter(connect(mapStateToProps)(Sidebar));
