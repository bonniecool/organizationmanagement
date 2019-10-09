import React, { PureComponent } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from 'app/modules/auth/container/SignIn';
import SignUp from 'app/modules/auth/container/SignUp';
import Home from 'app/modules/auth/container/Home';
import _ from 'lodash';
<<<<<<< HEAD
import 'assets/css/style.css';
=======
// import 'assets/css/style.css';
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb

class Main extends PureComponent {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Route exact path={`${match.path}`} component={Home} />
        <Route path={`${match.path}sign-in`} component={SignIn} />
        <Route path={`${match.path}sign-up`} component={SignUp} />
      </div>
    );
  }
}
const enhance = _.flowRight([
  withRouter,
  connect(),
]);

export default enhance(Main);
