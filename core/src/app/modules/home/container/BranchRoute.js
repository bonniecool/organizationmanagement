import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";
import { _ } from "app/Utils";

// const AsyncDashboard = AsyncComponent(() => import("../../dashboard/container"));
// const AsyncDashboardSuperAdmin = AsyncComponent(() => import("../../super-admin/dashboardSuperAdmin/container"));


class SuperAdminRoute extends Component {
  
  render() {

    return (
      <div className="">
        
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {

  return {
  };
};

export default withRouter(connect(mapStateToProps)(SuperAdminRoute));
