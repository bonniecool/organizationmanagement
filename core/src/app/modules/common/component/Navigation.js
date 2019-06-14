import React, { Component, Fragment } from "react";
import logo from '../../../../assets/img/avatar-1.jpg';
import { withRouter, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import _ from 'lodash';
import Acl from 'app/Acl';

class Navigation extends Component {

	state = {
		isOpenDropdown: false
	}

	componentDidMount(){
		document.body.addEventListener("click", this.handleClickBody);
	}

	handleClickBody = e => {
        if (!_.has(e.target.attributes['data-toggle'])) {
            this.setState({
                isOpenDropdown: false
            });
        }
    }

	render() {
		const { isShinked, location, profile, user_type, match  } = this.props;
		const path = location.pathname.split('/')[1];

		const getClassName = (name) => {
			if(path === name)
				return 'active';
			return '';
		}

		return (
			<nav className={`side-navbar ${isShinked && 'shrinked'}`} style={{position: 'fixed', bottom: 0, top: 46, overflowY: 'auto'}}>
				<div className="sidebar-header d-flex align-items-center">
					<div className="avatar">
						<img src={logo}
							alt="..."
							className="img-fluid rounded-circle"
						/>
					</div>
					<div className="title">
						<h1 className="h4">{ profile.getIn(['profile','first_name']) } { profile.getIn(['profile','last_name']) }</h1>
						<p>{ profile.get('profile_type') }</p>
					</div>
				</div>
				<span className="heading">Main</span>
				<ul className="list-unstyled">
					<Acl module="module" permission="dashboard-dashboard">
						<li className={getClassName("")}>
							<Link to="/" className="collapsed">
								<i className="material-icons">dashboard</i> Dashboard
							</Link>
						</li>
					</Acl>
					<Acl module="module" permission="employee-profile">
					{
						+user_type === 0 &&
						<li className={getClassName("employee")}>
							<Link to="/employee" className="collapsed">
								<i className="fa fa-user-circle-o" /> Employee
							</Link>
						</li>
					}
					</Acl>
					<Acl module="module" permission="payroll-payroll">
						<li className={getClassName("payroll")}>
							<Link to="/payroll" className="collapsed">
								<i className="fa fa-credit-card" /> Payroll
							</Link>
						</li>
					</Acl>
					<Acl module="module" permission="plantilla-plantilla">
					{
						+user_type === 0 &&
						<li className={getClassName("plantilla")}>
							<Link to="/plantilla" className="collapsed">	
								<i className="fa fa-vcard" /> Plantilla
							</Link>
						</li>
					}
					</Acl>
					<Acl module="module" permission="daily-time-record">
					{
						+user_type === 0 &&
						<li className={getClassName("dtr")}>
							<Link to="/dtr" className="collapsed">
								<i className="fa fa-clock-o" /> Daily Time Record
							</Link>
						</li>
					}
					</Acl>
					<Acl module="module" permission="training-training">
					{
						+user_type === 0 &&
						<li className={getClassName("training")}>
							<Link to="/training" className="collapsed">
								<i className="fa fa-users" /> Training
							</Link>
						</li>
					}
					</Acl>
					<Acl module="module" permission="leave-leave">
					{
						+user_type === 0 &&
						<li className={getClassName("leave")}>
							<Link to="/leave" className="collapsed">
								<i className="fa fa-calendar" /> Leave
							</Link>
						</li>
					}
					</Acl>
					<Acl module="head" permission={["recruitment-applicant","recruitment-vacancy"]}>
					{
						+user_type === 0 &&
					<li className={getClassName("recruitment")}>
						<Link to="/recruitment/applicant-201/:id?/personal" className="collapsed">
							<i className="fa fa-suitcase" /> Recruitment
						</Link>
					</li>
					}
					</Acl>
				</ul>
				{
					+user_type === 0 &&
					<Fragment>
						<span className="heading">Settings</span>
						<ul className="list-unstyled">
							<Acl module="head" permission={["organization-service","organization-section","organization-division","organization-department"]}>
								<li className={getClassName("organization")}>
									<Link to="/organization" className="collapsed">
										<i className="fa fa-share-alt" /> Organization
									</Link>
								</li>
							</Acl>
							<Acl module="module" permission="data-set-data-set">
								<li className={getClassName("dataset")}>
									<Link to="/dataset" className="collapsed">
										<i className="fa fa-server"/> Data Sets
									</Link>
								</li>
							</Acl>
							<Acl module="module" permission="salary-schedule-salary-grade">
							{
								+user_type === 0 &&
								<li className={getClassName("salaryschedule")}>
									<Link to="/salaryschedule" className="collapsed">
										<i className="fa fa-money" /> Salary Schedule
									</Link>
								</li>
							}
							</Acl>
							
							
						</ul>
					</Fragment>
				}
			</nav>
		);
	}
}

const mapStateToProps = (state, routeParams) => {
	const { isShinked } = state.nav.toJS();
	const { auth } = state;

    return {
        isShinked,
        profile:auth.get('profile'),
        user_type:auth.get('user_type')
    };
};

export default withRouter(connect(mapStateToProps)(Navigation));

