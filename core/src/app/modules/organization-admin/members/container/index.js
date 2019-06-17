import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from 'app/Utils';
import Organization from '../component/List'
import Profile from '../component/Profile'
import { fromJS } from 'immutable';
const AddModal = AsyncComponent(() => import ('./AddModal'));

class Dashboard extends Component {


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


	render() {
		const data = fromJS([
			{
				name:'Company A',
				address:'Manila Makati PHilippines',
				contact:'+63 12345678',
				email:'george@companya.com',
				photo:'',
			},
			{
				name:'Company B',
				address:'Ortigas Pasig PHilippines',
				contact:'+63 11122233',
				email:'john@companyb.com',
				photo:'',
			},
			{
				name:'Company C',
				address:'BGC Taguig PHilippines',
				contact:'+63 11122233',
				email:'paul@companyc.com',
				photo:'',
			},
			{
				name:'Company D',
				address:'Rotonda Quezon City PHilippines',
				contact:'+63 8765432',
				email:'lina@companyd.com',
				photo:'',
			}
		])

		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Members</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4">
							<div className="card">
								<div className="card-header">
									<button className="btn btn-primary btn-sm btn-block mb-2" type="button" onClick={this.onAdd}>Add Member</button>
									<div className="input-group input-group-sm">
									<input type="text" className="form-control" placeholder="Search Branches" />
									<div className="input-group-append">
										<button className="btn btn-sm btn-primary" type="button" >Search</button>
									</div>
								</div>
								</div>
								<div className="">
										<Organization
											data={data}
										/>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="card">
								<div className="card-header">
									Member's Name
									<div className="pull-right">
										<button className="btn btn-primary btn-sm mb-2" type="button" onClick={this.onAdd}>Edit Information</button>
									</div>
								</div>
								<div className="card-body">
										<Profile 
											data={data.getIn([0])}
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
	const superAdminOrganization = state.superAdminOrganization;
	return {
		list : superAdminOrganization.get('list'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
