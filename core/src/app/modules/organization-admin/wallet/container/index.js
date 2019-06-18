import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AsyncComponent } from 'app/Utils';
import * as c from '../constant';
const AddModal = AsyncComponent(() => import ('./AddModal'));
const PGIModal = AsyncComponent(() => import ('./PGIModal'));

class Dashboard extends Component {


	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
	}

	load = e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Credits',
					modalSize: 'modal-md',
					content: <AddModal 

						/>
			}
		})
	}


	render() {
		const { load_wallet } = this.props

		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Wallet</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-header">
									<div className="text-center display-4">
										<h1>{load_wallet ? load_wallet.get('amount') : '00.00'}</h1>
									</div>
									<div className="text-uppercase text-center">
										<p>Current Load Credits</p>
									</div>
								</div>
								<div className="card-body">
									<div className="text-uppercase text-center">
										<button className="btn btn-success btn-lg" onClick={this.load}> LOAD CREDITS </button>
									</div>
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
	const organizationWallet = state.organizationWallet;
	const profile = state.auth.get('profile');
	return {
		list : organizationWallet.get('list'),
		load_wallet : profile.get('load_wallet'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
