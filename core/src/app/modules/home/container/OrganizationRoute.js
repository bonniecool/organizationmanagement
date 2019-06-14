import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";

const DashBoard = AsyncComponent(() => import("../../organization-admin/dashboard/container"));
const Branches = AsyncComponent(() => import("../../organization-admin/branches/container"));
const Transaction = AsyncComponent(() => import("../../organization-admin/transaction/container"));
const Members = AsyncComponent(() => import("../../organization-admin/members/container"));

class SuperAdminRoute extends Component {

  render() {
    const { match } = this.props;
    return (
      <div className="page home-page">
        <Route exact path={`${match.path}`} component={DashBoard} />
        <Route path={`${match.path}branches`} component={Branches} />
        <Route path={`${match.path}transaction`} component={Transaction} />
        <Route path={`${match.path}members`} component={Members} />
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {

  return {
  };
};

export default withRouter(connect(mapStateToProps)(SuperAdminRoute));
