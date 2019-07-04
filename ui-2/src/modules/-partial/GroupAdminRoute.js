import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GroupDashboard from '../dashboard-group/container/DashboardGroup';
import AdministratorSideBar from '../common/components/AdministratorSideBar';
import StatisticsPanel from '../common/components/StatisticsPanel';

class GroupAdminRoute extends Component {
  render() {
    return (
      <main className="app-wrapper">
        <AdministratorSideBar />
        <section className="main-content">
          <Switch>
            <Route path="/dashboard" component={GroupDashboard} />
            <Redirect to="/dashboard" />
          </Switch>
          <div className="statistic-panel">
            <StatisticsPanel />
          </div>
        </section>
      </main>
    );
  }
}

export default GroupAdminRoute;
