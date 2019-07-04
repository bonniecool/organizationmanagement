import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../dashboard/container/Dashboard';
import GroupsContainer from '../groups/container/GroupsContainer';
import Sidebar from '../common/components/Sidebar';
import StatisticsPanel from '../common/components/StatisticsPanel';
import UserListContainer from '../user-list/container/UserListContainer';
import ServicesContainer from '../services/container/ServicesContainer';
import StatgesContainer from '../stages/container/StagesContainer';
import DashboardGroup from '../dashboard-group/container/DashboardGroup';
import CreateQuestionnaires from '../services/container/CreateQuestionnaires';
import TransactionContainer from '../transaction/container/TransactionContainer';

class SuperAdminRoute extends Component {
  render() {
    return (
      <main className="app-wrapper">
        <Sidebar />
        <section className="main-content">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/groups" component={GroupsContainer} />
            <Route path="/user-list" component={UserListContainer} />
            <Route path="/services" component={ServicesContainer} />
            <Route path="/create-questionnaires" component={CreateQuestionnaires} />
            <Route path="/stages" component={StatgesContainer} />
            <Route path="/admin/dashboard" component={DashboardGroup} />
            <Route path="/transaction" component={TransactionContainer} />
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

export default SuperAdminRoute;
