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


	render() {
		const { details } = this.props;
		const token = sessionStorage.getItem('token')
		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">QR Code</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-header text-center">
									<object type="image/svg+xml" data={`${process.env.REACT_APP_END_POINT}/mng/brc/qrcode?token=${token}`} height="400">
										Your browser does not support SVG
									</object>
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
	const branchQRCode = state.branchQRCode;
	return {
		details : branchQRCode.get('details'),
		form_data : branchQRCode.get('form_data'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
