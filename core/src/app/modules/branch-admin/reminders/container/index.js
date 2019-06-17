import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as c from '../constant';
import { AsyncComponent } from 'app/Utils';
import Organization from '../component/List'
import Profile from '../component/Profile'
import moment from 'moment-timezone';
const AddModal = AsyncComponent(() => import ('./AddModal'));
const EditModal = AsyncComponent(() => import ('./EditModal'));
const SendSmsModal = AsyncComponent(() => import ('./SendSmsModal'));
const RemoveModal = AsyncComponent(() => import ('./RemoveModal'));

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
					title: 'Add Organization',
					modalSize: 'modal-md',
					content: <AddModal 

						/>
			}
		})
	}

	sendSMS = data =>  e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Send SMS',
					modalSize: 'modal-md',
					content: <SendSmsModal 
					data={data}
						/>
			}
		})
	}


	onEdit = data => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		let newData = data.toJS()
				newData['expiration_date'] = data.get('expiration_date') ? moment(data.get('expiration_date')) :''
		dispatch({
			type:c.SET_FORM_DATA,
			data:newData
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

	onRemove = data => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Edit Branch',
					modalSize: 'modal-md',
					content: <RemoveModal 
									data={data}
							/>
			}
		})
	}


	render() {

		const { list, details } = this.props;
		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Reminders</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4">
							<div className="card">
								<div className="card-header">
								<button className="btn btn-primary btn-sm btn-block mb-2" type="button" onClick={this.onAdd}>Add Reminders</button>
									<div className="input-group input-group-sm">
									<input type="text" className="form-control" placeholder="Search announcements" />
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
								 <div className="pull-left text-uppercase"><b>{details.get('subject')}</b></div>
									<div className="btn-group btn-group-sm pull-right">
										<button className="btn btn-primary btn-sm" type="button" onClick={this.onEdit(details)}>Edit</button>
										<button className="btn btn-danger btn-sm" type="button" onClick={this.onRemove(details)}>Remove</button>
									</div>
								</div>
								<div className="card-body">
										<Profile 
											data={details}
										/>
								</div>
								<div className="card-footer">
									<div className="pull-left">
										<button className="btn btn-sm btn-primary" onClick={this.sendSMS(details)}>Send via SMS</button>
									</div>
									<div className="pull-right">

										<small><b>Date Expired: {details.get('expiration_date') ? moment(details.get('expiration_date')).format('YYYY-MM-DD') : ''}</b></small>
									</div>
								</div>
							</div>
							<div className="card mt-3">
								<div className="card-header">
								 <div className="pull-left text-uppercase"><b>SMS Logs</b></div>
								</div>
								<div className="card-body">
										
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
	const branchReminders = state.branchReminders;
	return {
		list : branchReminders.get('list'),
		details : branchReminders.get('details'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
