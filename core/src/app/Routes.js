import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter} from "react-router-dom";
import { AsyncComponent } from './Utils';
import { connect } from 'react-redux';
import _ from 'lodash';

// const AsyncHomeContainer = AsyncComponent(() => import('./modules/home/container/Home'));
// const AsyncSignInContainer = AsyncComponent(() => import('./modules/auth/container/SignInContainer'));
// const AsyncRegisterContainer = AsyncComponent(() => import('./modules/auth/container/SignUpContainer'));

const Main = AsyncComponent(() => import('./modules/auth/container/Main'));
const SuperAdminRoute = AsyncComponent(() => import('./modules/superAdmin/main/containers/Main'));
const OrganizationAdminRoute = AsyncComponent(() => import('./modules/organizationAdmin/main/containers/Main'));
// const BranchAdminRoute = AsyncComponent(() => import('./modules/branchAdmin/main/containers/Main'));

class Routes extends Component{


    render(){
      const { isAuthenticated, profileType } = this.props;
          if (!isAuthenticated) {
            return <Main />;
          }
          return (
            <div>
              <Switch>
                {profileType === 'SuperAdmin' && <Route path="/" component={SuperAdminRoute} />}
                {profileType === 'Administrator' && <Route path="/" component={OrganizationAdminRoute} />}
                {
                // {profileType === 'BranchAdministrator' && <Route path="/" component={BranchAdminRoute} />}
              }
                <Redirect to="/" />
              </Switch>
            </div>
          );
    }
}

const mapStateToProps = (state, routeParams) => {
  const profileType =  state.auth.get('user_type')
  return {
    profileType
  };
};

export default withRouter(connect(mapStateToProps)(Routes));


