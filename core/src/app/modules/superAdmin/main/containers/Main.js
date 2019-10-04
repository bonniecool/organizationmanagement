/* eslint-disable */
import React, { PureComponent } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import SideBar from './SideBar';
import Header from './Header';
import Dashboard from 'app/modules/superAdmin/dashboard/container/Dashboard';
import Organization from 'app/modules/superAdmin/organization/container/Organization';
import Transaction from 'app/modules/superAdmin/transaction/container/Transaction';
import thumbnail from 'assets/images/500x500.png';

class Main extends PureComponent {

  state = {
    isOpenDropdown: false
  };

  componentDidMount() {
    document.body.addEventListener("click", this.handleClickBody);
  }

  handleClickBody = e => {
    if (!_.has(e.target.attributes["data-toggle"])) {
      this.setState({
        isOpenDropdown: false
      });
    }
  };

  handleDropDown = e => {
    e.preventDefault();
      this.setState({
        isOpenDropdown: !this.state.isOpenDropdown
      });
  };

  signout = e => {
    e.preventDefault();
    const { dispatch } = this.props
    dispatch({
      type: 'SIGN_OUT',
    });
  };

  render() {
    const { match } = this.props;
    const profile = JSON.parse(sessionStorage.getItem('profile'))

    return (
      <div className="az-body az-body-sidebar">
        <div className="az-sidebar">
          <Header />
          <SideBar />
        </div>
        <div className="az-content az-content-dashboard-two">
          <div className="az-header">
            <div className="container-fluid">
              <div className="az-header-left">
                <a href="" id="azSidebarToggle" className="az-header-menu-icon"><span></span></a>
              </div>
              <div className="az-header-center">
              {
                // <input type="search" className="form-control" placeholder="Search for anything..." />
                // <button className="btn"><i className="fas fa-search"></i></button>
              }
                
              </div>
              <div className="az-header-right">
                <div className="az-header-message">
                  <a href="app-chat.html"><i className="typcn typcn-messages"></i></a>
                </div>
                <div className="dropdown az-header-notification">
                  <a href="" className="new"><i className="typcn typcn-bell"></i></a>
                  <div className="dropdown-menu">
                    <div className="az-dropdown-header mg-b-20 d-sm-none">
                      <a href="" className="az-header-arrow"><i className="icon ion-md-arrow-back"></i></a>
                    </div>
                    <h6 className="az-notification-title">Notifications</h6>
                    <p className="az-notification-text">You have 2 unread notification</p>
                    <div className="az-notification-list">
                      <div className="media new">
                        <div className="az-img-user"><img src="https://via.placeholder.com/500x500" alt="" /></div>
                        <div className="media-body">
                          <p>Congratulate <strong>Socrates Itumay</strong> for work anniversaries</p>
                          <span>Mar 15 12:32pm</span>
                        </div>
                      </div>
                      <div className="media new">
                        <div className="az-img-user online"><img src="https://via.placeholder.com/500x500" alt="" /></div>
                        <div className="media-body">
                          <p><strong>Joyce Chua</strong> just created a new blog post</p>
                          <span>Mar 13 04:16am</span>
                        </div>
                      </div>
                      <div className="media">
                        <div className="az-img-user"><img src="https://via.placeholder.com/500x500" alt="" /></div>
                        <div className="media-body">
                          <p><strong>Althea Cabardo</strong> just created a new blog post</p>
                          <span>Mar 13 02:56am</span>
                        </div>
                      </div>
                      <div className="media">
                        <div className="az-img-user"><img src="https://via.placeholder.com/500x500" alt="" /></div>
                        <div className="media-body">
                          <p><strong>Adrian Monino</strong> added new comment on your photo</p>
                          <span>Mar 12 10:40pm</span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-footer"><a href="">View All Notifications</a></div>
                  </div>
                </div>
                <div className={`dropdown az-profile-menu ${ this.state.isOpenDropdown && 'show' }`}>
                  <a to="" className="az-img-user"><img src={_.get(profile,'photo') || thumbnail} alt="" onClick={this.handleDropDown} data-toggle="dropdown"/></a>
                  <div className="dropdown-menu">
                    <div className="az-dropdown-header d-sm-none">
                      <a href="" className="az-header-arrow"><i className="icon ion-md-arrow-back"></i></a>
                    </div>
                    <div className="az-header-profile">
                      <div className="az-img-user">
                        <img src={_.get(profile,'photo') || thumbnail} alt="" />
                      </div>
                      <h6>Aziana Pechon</h6>
                      <span>Premium Member</span>
                    </div>
                    <a href="" className="dropdown-item"><i className="typcn typcn-user-outline"></i> My Profile</a>
                    <a href="" className="dropdown-item"><i className="typcn typcn-edit"></i> Edit Profile</a>
                    <a href="" className="dropdown-item"><i className="typcn typcn-time"></i> Activity Logs</a>
                    <a href="" className="dropdown-item"><i className="typcn typcn-cog-outline"></i> Account Settings</a>
                    <a href="" className="dropdown-item"  onClick={this.signout}><i className="typcn typcn-power-outline"></i> Sign Out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Switch>
              <Route exact path={`${match.path}`} component={Dashboard}/>
              <Route path={`${match.path}organization`} component={Organization}/>
              <Route path={`${match.path}transaction`} component={Transaction}/>
          </Switch>
          <div className="az-footer">
        <div className="container-fluid">
          <span>&copy; 2019 Assembly.com</span>

        </div>
      </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, routeParams) => {

	return {

	};
};

export default withRouter(connect(mapStateToProps)(Main));