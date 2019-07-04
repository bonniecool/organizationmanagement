/* eslint-disable */
import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { IconSearch } from '../../common/components/Icon';
import GroupList from '../../groups/component/GroupList';
import ServiceContent from './ServiceContent';
import CreateQuestionnaires from './CreateQuestionnaires';
class ServicesContainer extends PureComponent {
  render() {
    const { match } = this.props;
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
              <div className="sub-header">
                <p className="total-group-title">Total Group (8)</p>
              </div>
              <GroupList />
            </div>
          </div>
          <div className="col-md-8 col-lg-9 px-0 h-100">
            <div className="app-content">
              <Switch>
                <Route path={`${match.path}/add-question`} component={CreateQuestionnaires} />
                <Route path="/" component={ServiceContent} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ServicesContainer;
