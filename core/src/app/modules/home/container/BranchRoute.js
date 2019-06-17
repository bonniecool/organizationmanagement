import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";

const DashBoard = AsyncComponent(() => import("../../branch-admin/dashboard/container"));
const Members = AsyncComponent(() => import("../../branch-admin/members/container"));
const Transaction = AsyncComponent(() => import("../../branch-admin/transaction/container"));
const Events = AsyncComponent(() => import("../../branch-admin/events/container"));
const Attendance = AsyncComponent(() => import("../../branch-admin/attendance/container"));
const Guests = AsyncComponent(() => import("../../branch-admin/guests/container"));
const CommentsSuggestions = AsyncComponent(() => import("../../branch-admin/comments-suggestions/container"));
const Announcements = AsyncComponent(() => import("../../branch-admin/announcements/container"));
const Reminders = AsyncComponent(() => import("../../branch-admin/reminders/container"));

class SuperAdminRoute extends Component {
  
  render() {
    const { match } = this.props;
    return (
      <div className="page home-page">
        <Route exact path={`${match.path}`} component={DashBoard} />
        <Route path={`${match.path}members`} component={Members} />
        <Route path={`${match.path}transaction`} component={Transaction} />
        <Route path={`${match.path}attendance`} component={Attendance} />
        <Route path={`${match.path}events`} component={Events} />
        <Route path={`${match.path}guests`} component={Guests} />
        <Route path={`${match.path}comments-suggestions`} component={CommentsSuggestions} />
        <Route path={`${match.path}announcements`} component={Announcements} />
        <Route path={`${match.path}reminders`} component={Reminders} />
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {

  return {
  };
};

export default withRouter(connect(mapStateToProps)(SuperAdminRoute));
