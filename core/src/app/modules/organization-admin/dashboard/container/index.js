import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as c from '../constant';
import { AsyncComponent } from 'app/Utils';

const Bar = AsyncComponent(() => import('app/modules/chart/Bar'));

class Dashboard extends Component {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_ACTIVE_BRANCHES
		})
		dispatch({
			type:c.GET_MEMBERS_PER_BRANCH
		})
		dispatch({
			type:c.GET_TOTAL_BRANCH
		})
	}

	render() {

		const { total_branch, members, branch_status } = this.props;
		const color = {background:'#'+(Math.random()*0xFFFFFF<<0).toString(16)};

		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Dashboard</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col">
							<div className="card mt-2">
								<div className="card-body">
									<div className="">
										<div className="d-flex align-items-center">
											<div className="circularIcon-wrapper-big">
												<div className="circularIcon-big" style={color} >
												{
													total_branch.get('total')
												}
												</div>
											</div>
											<div style={{'width':'100px', 'height':'100px','zIndex':9}}>
											</div>
											<div className="numberItem ml-auto">
											<b>Total Branches</b>
											</div>
										</div>
										<div className="titleItem mt-2">
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card mt-2">
								<div className="card-body">
									<div className="">
										<div className="d-flex align-items-center">
											<div className="circularIcon-wrapper-big">
												<div className="circularIcon-big" style={{background:"#" + ((Math.random() * 0xffffff) << 0).toString(16)}} >
												{
													branch_status.get('active')
												}
												</div>
											</div>
											<div style={{'width':'100px', 'height':'100px','zIndex':9}}>
											</div>
											<div className="numberItem ml-auto">
											<b>Active Branches</b>
											</div>
										</div>
										<div className="titleItem mt-2">
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card mt-2">
								<div className="card-body">
									<div className="">
										<div className="d-flex align-items-center">
											<div className="circularIcon-wrapper-big">
												<div className="circularIcon-big" style={{background:"#" + ((Math.random() * 0xffffff) << 0).toString(16)}} >
												{
													branch_status.get('inactive')
												}
												</div>
											</div>
											<div style={{'width':'100px', 'height':'100px','zIndex':9}}>
											</div>
											<div className="numberItem ml-auto">
											<b>InActive Branches</b>
											</div>
										</div>
										<div className="titleItem mt-2">
											
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<section className="">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-8">
								<div className="list-box card d-flex align-items-stretch">
									<div className="card-header d-flex align-items-center">
										<h2 className="mr-auto">Members Count</h2>
									</div>
									<div className="card-body list">
										<div className="row">
											<div className="col">
												<Bar
													data={members.toJS()}
													index_name="name"
													index_value="member_count"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col d-flex">
								<div className="list-box card d-flex align-items-stretch" style={{width:"100%"}}>
									<div className="card-header d-flex align-items-center">
										<h2 className="mr-auto">Clients</h2>
									</div>
									<div className="card-body list">
										<div className="row">
											<div className="col">
											{
												// statistic &&
												// <Table 
												// 	data={statistic.get('agency_list') || [] }
												// />
											}
											</div>
										</div>
									</div>
								</div>
							</div>
							

						</div>
					</div>
				</section>
				<section className="">
					<div className="container-fluid">
						<div className="row">
							<div className="col">
								<div className="list-box card">
									<div className="card-header d-flex align-items-center">
										<h2 className="mr-auto">Map</h2>
									</div>
									<div className="card-body list">
										<div className="row">
											<div className="col">
											{
												// <GeoMap
												// 	data={ mapData }
												// />
											}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = (state, routeParams) => {
	const organizationDashboard = state.organizationDashboard;
	return {
		branch_status : organizationDashboard.get('branch_status'),
		members : organizationDashboard.get('members'),
		total_branch : organizationDashboard.get('total_branch'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
