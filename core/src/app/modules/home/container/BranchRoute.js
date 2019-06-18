import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";

const DashBoard = AsyncComponent(() => import("../../branch-admin/dashboard/container"));
const Members = AsyncComponent(() => import("../../branch-admin/members/container"));

const Attendance = AsyncComponent(() => import("../../branch-admin/attendance/container"));
const Reminders = AsyncComponent(() => import("../../branch-admin/reminders/container"));
const QRCode = AsyncComponent(() => import("../../branch-admin/qr-code/container"));
const SMSLogs = AsyncComponent(() => import("../../branch-admin/sms-logs/container"));

class SuperAdminRoute extends Component {
  
  render() {
    const { match } = this.props;
    return (
      <div className="page home-page">
        <Route exact path={`${match.path}`} component={DashBoard} />
        <Route path={`${match.path}members`} component={Members} />

        <Route path={`${match.path}attendance`} component={Attendance} />
        <Route path={`${match.path}reminders`} component={Reminders} />
        <Route path={`${match.path}qr-code`} component={QRCode} />
        <Route path={`${match.path}sms-logs`} component={SMSLogs} />
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {

  return {
  };
};

export default withRouter(connect(mapStateToProps)(SuperAdminRoute));
