import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as c from '../constant';
import { AsyncComponent } from 'app/Utils';
import Organization from '../component/List'
import Profile from '../component/Profile'
import MemberList from '../component/MemberList'

const AddAdminModal = AsyncComponent(() => import ('./AddAdminModal'));
const EditAdminModal = AsyncComponent(() => import ('./EditAdminModal'));
const AddModal = AsyncComponent(() => import ('./AddModal'));
const EditModal = AsyncComponent(() => import ('./EditModal'));

class Dashboard extends Component {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
	}

	onSelectRow = (data) => {
		const { dispatch } = this.props;
		dispatch({
				type:c.GET_DETAIL,
				id:data.get('id')     
		})
	}

	onAdd = e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Branch',
					modalSize: 'modal-md',
					content: <AddModal 

						/>
			}
		})
	}


	onEdit = data => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:c.SET_FORM_DATA,
			data:data.toJS()
		})
			dispatch({
					type:c.GET_PROVINCES,
					region_id:data.get('region_code') || ''
			})
			dispatch({
					type:c.GET_MUNICIPALITIES,
					region_id:data.get('region_code'),
					province_id:data.get('province_code') || ''
			})
			dispatch({
					type:c.GET_BARANGAYS,
					region_id:data.get('region_code'),
					province_id:data.get('province_code'),
					municipality_id:data.get('municipality_code'),
			})
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Edit Branch',
					modalSize: 'modal-md',
					content: <EditModal 
										data={data}
									/>
			}
		})
	}


	onAddAdmin = (data) => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Branch',
					modalSize: 'modal-md',
					content: <AddAdminModal 
							data={data}
						/>
			}
		})
	}

	editAdmin = (data) => e => {
		e.preventDefault();
		const { dispatch, details } = this.props;
		dispatch({
			type:c.SET_FORM_DATA,
			data:{
				first_name:data.get('first_name'),
				last_name:data.get('last_name'),
				email:data.getIn(['user','email']),
				id:data.getIn(['user','profile_id']),
			}
		})
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Admin',
					modalSize: 'modal-md',
					content: <EditAdminModal 
							data={details}
						/>
			}
		})
	}

	removeAdmin = (data) => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:c.SET_FORM_DATA,
			data:{
				first_name:data.get('first_name'),
				last_name:data.get('last_name'),
				email:data.get('email')
			}
		})
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Admin',
					modalSize: 'modal-md',
					content: <EditAdminModal 
							data={data}
						/>
			}
		})
	}


	render() {
		const { list, details, members } = this.props;

		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Branch</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4">
							<div className="card">
								<div className="card-header">
									<button className="btn btn-primary btn-sm btn-block mb-2" type="button" onClick={this.onAdd}>Add Branches</button>
									<div className="input-group input-group-sm">
									<input type="text" className="form-control" placeholder="Search Branches" />
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
								 <b className="text-uppercase">{ details.get('name') }</b>
								 	<div className="pull-right">
										<button className="btn btn-primary btn-sm mb-2" type="button" onClick={this.onEdit(details)}>Edit Branch</button>
									</div>
								</div>
								<div className="card-body">
										<Profile 
											data={details}
										/>
								</div>
							</div>
							<div className="card mt-3">
								<div className="card-header">
								 <b className="text-uppercase">Branch Admins</b>
								 <div className="pull-right">
										<button className="btn btn-primary btn-sm mb-2" type="button" onClick={this.onAddAdmin(details)}>Add Admin</button>
									</div>
								</div>
								<div className="">
										<MemberList 
											data={members}
											editAdmin={this.editAdmin}
											removeAdmin={this.removeAdmin}
										/>
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
	const organizationBranch = state.organizationBranch;
	return {
		list : organizationBranch.get('list'),
		details : organizationBranch.get('details'),
		form_data : organizationBranch.get('form_data'),
		members : organizationBranch.get('members'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
