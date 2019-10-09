import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { AsyncComponent } from 'app/Utils';
import Organization from '../component/List'
import * as c from '../constant';
import DatePicker from 'react-datepicker';

class Dashboard extends Component {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
	}

	handleOnChangeDate = key => (value) => {
		const { dispatch } = this.props;
		dispatch({
			type: c.SET_FORM_DATA,
			data: {
				[key]: value,
			},
		});
	}

<<<<<<< HEAD

=======
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
	render() {
		const { list, form_data } = this.props;

		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Attendance</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-header">
									<div className="input-group input-group-sm">
										<DatePicker
											selected={form_data.get('date_from')}
											name="date_from"
											onChange={this.handleOnChangeDate('date_from')}
											dateFormat="YYYY/MM/DD"
											className="form-control"
											placeholderText="Date From"
									/>
										<DatePicker
											selected={form_data.get('date_to')}
											name="date_to"
											onChange={this.handleOnChangeDate('date_to')}
											dateFormat="YYYY/MM/DD"
											className="form-control"
											placeholderText="Date To"
										/>
										<div className="input-group-append">
											<button className="btn btn-primary btn-sm" id="">Filter</button>
										</div>
									</div>
								</div>
								<div className="card-header">
									<div className="input-group input-group-sm">
										<input type="text" className="form-control" placeholder="Search Organization" />
										<div className="input-group-append">
											<button className="btn btn-sm btn-primary" type="button" >Search Name</button>
										</div>
									</div>
								</div>
								<div className="">
										<Organization
											data={list}
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
	const branchAttendance = state.branchAttendance;
	return {
		list : branchAttendance.get('list'),
		form_data : branchAttendance.get('form_data'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
