import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";
import './style.css';

class Sidebar extends Component {

  render() {
    const { match, user_type } = this.props;
    return (
      <div id="sidebar">
        sidebar
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps)(Sidebar));
