import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as c from '../constant';
import Organization from '../component/List'
import Profile from '../component/Profile'

class Dashboard extends Component {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
		dispatch({
			type:c.GET_REGIONS
		})
	}

	onSelectRow = (data) => {
		const { dispatch } = this.props;
		dispatch({
				type:c.GET_DETAIL,
				id:data.get('id')     
		})
	}

	render() {
		const { list, details } = this.props;
		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Organization</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4">
							<div className="card">
								<div className="card-header">
									<div className="input-group input-group-sm">
									<input type="text" className="form-control" placeholder="Search Organization" />
									<div className="input-group-append">
										<button className="btn btn-sm btn-primary" type="button" >Search</button>
									</div>
								</div>
								</div>
								<div className="">
									<Organization
										data={list}
										onSelectRow={this.onSelectRow}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="card">
								<div className="card-header">
									<div className="pull-left">{details.get('name')}</div>
								</div>
								<div className="card-body">
										<Profile data={details} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, routeParams) => {
	const superAdminOrganization = state.superAdminOrganization;
	return {
		list : superAdminOrganization.get('list'),
		details : superAdminOrganization.get('details'),
		form_data : superAdminOrganization.get('form_data'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
