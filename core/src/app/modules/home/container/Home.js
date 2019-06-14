import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from "app/Utils";

const MainHeader = AsyncComponent(() => import ('../../common/component/MainHeader'));
const SidebarSuper = AsyncComponent(() => import ('../../common/component/SidebarSuper'));
const SidebarOrganization = AsyncComponent(() => import ('../../common/component/SidebarOrganization'));
const SidebarBranch = AsyncComponent(() => import ('../../common/component/SidebarBranch'));
const SuperRoute = AsyncComponent(() => import ('./SuperRoute'));
const OrganizationRoute = AsyncComponent(() => import ('./OrganizationRoute'));
const BranchRoute = AsyncComponent(() => import ('./BranchRoute'));

class Home extends Component {
  

  sidebar = type => {
    const sidebar = {
      'super' : <SidebarSuper />,
      'admin' : <SidebarOrganization />, 
      'branch' : <SidebarBranch />,
      'default' : '',
    }
    return sidebar[type];
  }

  mainRoutes = type => {
    const route = {
      'super' : <SuperRoute />,
      'admin' : <OrganizationRoute />, 
      'branch' : <BranchRoute />,
      'default' : '',
    }
    return route[type];
  }

  render() {
    const { isShinked } = this.props;
    const user = 'admin';

    return (
      <div className="page home-page">
        <MainHeader />
        <div className="page-content">
          {
            this.sidebar(user)
          }
          <div className={`content-inner ${!isShinked && "active"}`}>
          {
            this.mainRoutes(user)
          }
          </div>
        </div>
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
