import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";

const DashBoard = AsyncComponent(() => import("../../super-admin/dashboard/container"));
const Organization = AsyncComponent(() => import("../../super-admin/organization/container"));
const Transaction = AsyncComponent(() => import("../../super-admin/transaction/container"));

class SuperAdminRoute extends Component {
  
  render() {
    const { match } = this.props;
    return (
      <div className="page home-page">

        <Route exact path={`${match.path}`} component={DashBoard} />
        <Route path={`${match.path}organization`} component={Organization} />
        <Route path={`${match.path}transaction`} component={Transaction} />
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {

  return {
  };
};

export default withRouter(connect(mapStateToProps)(SuperAdminRoute));
