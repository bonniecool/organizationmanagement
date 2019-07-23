import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
      'SuperAdmin' : <SidebarSuper />,
      'Administrator' : <SidebarOrganization />, 
      'BranchAdministrator' : <SidebarBranch />,
      'default' : '',
    }
    return sidebar[type];
  }

  mainRoutes = type => {
    const route = {
      'SuperAdmin' : <SuperRoute />,
      'Administrator' : <OrganizationRoute />, 
      'BranchAdministrator' : <BranchRoute />,
      'default' : '',
    }
    return route[type];
  }

  render() {
    const { isShinked, user_type } = this.props;
    const user = user_type;

    return (
      <Switch>
        <Route exact path={`${match.path}`} component={Home} />
        <Route path={`${match.path}sign-in`} component={SignIn} />
        <Route path={`${match.path}sign-up`} component={SignUp} />
      </Switch>
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
