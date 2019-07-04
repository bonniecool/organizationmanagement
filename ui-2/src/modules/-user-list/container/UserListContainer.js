import React, { PureComponent } from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import GenericList from 'modules/common/components/GenericList';
import { getEllipsis } from 'helper';
import { IconSearch } from '../../common/components/Icon';
import UserContent from './UserContent';
// import CreateUser from './CreateUser';
// import EditUser from './EditUser';
import * as actions from '../actions';
import * as c from '../constants';

class UsersContainer extends PureComponent {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
    getUserList: PropTypes.instanceOf(Function).isRequired,
    userList: PropTypes.instanceOf(Array).isRequired,
    isLoading: PropTypes.bool.isRequired,
    userListPager: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  }

  static defaultProps = {
  }

  state = {
    page: 1,
  }

  componentDidMount = () => {
    this.updateUserList();
  }

  updateUserList = () => {
    const { getUserList } = this.props;
    getUserList(this.state);
  }

  handleSelectRow = ({ id }) => {
    const { history, match } = this.props;
    history.push(`${match.url}/${id}`);
  };

  render() {
    const {
      match,
      userList,
      isLoading,
      userListPager,
    } = this.props;

    return (
      <div className="container-fluid h-100">
        <div className="row px-0 h-100">
          <div className="col-md-4 col-lg-3 px-0 h-100">
            <div className="app-list">
              <div className="header">
                <div className="search-form">
                  <form action="">
                    <div className="inner-addon left-addon">
                      <IconSearch />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control normal with-icon"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <Route
                path={`${match.path}/:userId?`}
                render={({ match: { params } }) => (
                  <GenericList
                    label="User Management"
                    labelKey={item => (
                      <>
                        <div className="thumbnail">
                          <img
                            className="user-photo rounded-circle"
                            src="//randomuser.me/api/portraits/men/55.jpg"
                            alt="Darrell Cox"
                          />
                        </div>
                        <div className="user-info">
                          <p className="user-group">{_.get(item, 'profile_type')}</p>
                          <p className="user-fullname">{getEllipsis(_.get(item, 'profile.full_name'), 18) || ''}</p>
                        </div>
                      </>
                    )}
                    isLoading={isLoading}
                    selected={params.userId}
                    data={userList}
                    rowsCount={userListPager.total || 0}
                    onSelectRow={this.handleSelectRow}
                    height={400}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-md-8 col-lg-9 px-0 h-100">
            <div className="app-content">
              <Switch>
                <Route path={`${match.path}/:userId?`} component={UserContent} />
                {/* <Route path={`${match.path}/edit`} component={EditUser} /> */}
                {/* <Route path={`${match.path}/add`} component={CreateUser} /> */}
              </Switch>
            </div>
          </div>
        </div>
        <Route
          path={`${match.path}/:userId?`}
          render={({ match: { params } }) => (!params.userId && userList.length > 0 ? <Redirect to={`${match.url}/${_.get(userList, '0.id')}`} /> : null)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ api }) => ({
  userList: _.get(api, `${c.GET_USER_LIST}.list`) || [],
  isLoading: api.loading.indexOf(c.GET_USER_LIST) > -1,
  userListPager: _.get(api, `${c.GET_USER_LIST}.pager`) || {},
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
]);

export default enhance(UsersContainer);
