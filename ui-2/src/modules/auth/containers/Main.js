import React, { PureComponent } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from 'modules/auth/containers/SignIn';
import SignUp from 'modules/auth/containers/SignUp';
import Home from 'modules/auth/containers/Home';
import 'assets/styles/style.css';

class Main extends PureComponent {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={Home} />
        <Route path={`${match.path}sign-in`} component={SignIn} />
        <Route path={`${match.path}sign-up`} component={SignUp} />
      </Switch>
    );
  }
}
const enhance = _.flowRight([
  withRouter,
  connect(),
]);

export default enhance(Main);
