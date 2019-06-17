import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from 'app/Utils';
import Organization from '../component/List'
import * as c from '../constant';
const AddModal = AsyncComponent(() => import ('./AddModal'));

class Dashboard extends Component {


	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
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


	render() {
		const { list } = this.props
		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Transactions</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
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
	const organizationTransaction = state.organizationTransaction;
	return {
		list : organizationTransaction.get('list'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
