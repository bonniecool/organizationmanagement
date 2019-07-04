import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import _ from 'lodash';
import withAuth from 'modules/auth/hoc/withAuth';
import Main from 'modules/auth/containers/Main';

import SuperAdminRoute from 'modules/superAdmin/main/containers/Main';
import OrganizationAdminRoute from 'modules/organizationAdmin/main/containers/Main';
import BranchAdminRoute from 'modules/branchAdmin/main/containers/Main';

class Routes extends PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    profileType: PropTypes.string.isRequired,
  };

  static defaultProps = {}

  render() {
    const { isAuthenticated, profileType } = this.props;

    if (!isAuthenticated) {
      return <Main />;
    }

    return (
      <>
        {
          // <GlobalLoader isLoading={loading.length > 0} />
        }
        <Switch>
          {profileType === 'SuperAdmin' && <Route path="/" component={SuperAdminRoute} />}
          {profileType === 'Administrator' && <Route path="/" component={OrganizationAdminRoute} />}
          {profileType === 'BranchAdministrator' && <Route path="/" component={BranchAdminRoute} />}
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}

const mapDispatchToProps = () => ({});

const mapStateToProps = ({ auth }) => ({
  profileType: _.get(auth, 'profileType'),
  isAuthenticated: _.get(auth, 'isAuthenticated', false),
  // loading: _.get(loading, 'loading', []).length > 0,
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withAuth,
]);

export default enhance(Routes);
