import React, { PureComponent } from "react";

class Table4 extends PureComponent {
	render() {
		return (
			<div className="col-lg-4">
				<div className="recent-activities card">
					<div className="card-close">
						<div className="dropdown">
							<button
								type="button"
								id="closeCard"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								className="dropdown-toggle">
								<i className="fa fa-ellipsis-v" />
							</button>
							<div
								aria-labelledby="closeCard"
								className="dropdown-menu has-shadow">
								<a className="dropdown-item remove">
									<i className="fa fa-times" />Close
								</a>
								<a className="dropdown-item edit">
									<i className="fa fa-gear" />Edit
								</a>
							</div>
						</div>
					</div>
					<div className="card-header">
						<h3 className="h4">Recent Activities</h3>
					</div>
					<div className="card-body">
						<div className="item">
							<div className="row">
								<div className="col-4 date-holder text-right">
									<div className="icon">
										<i className="icon-clock" />
									</div>
									<div className="date">
										<span>6:00 am</span>
										<span className="text-info">
											6 hours ago
										</span>
									</div>
								</div>
								<div className="col-8 content">
									<h5>Meeting</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
								</div>
							</div>
						</div>
						<div className="item">
							<div className="row">
								<div className="col-4 date-holder text-right">
									<div className="icon">
										<i className="icon-clock" />
									</div>
									<div className="date">
										<span>6:00 am</span>
										<span className="text-info">
											6 hours ago
										</span>
									</div>
								</div>
								<div className="col-8 content">
									<h5>Meeting</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
								</div>
							</div>
						</div>
						<div className="item">
							<div className="row">
								<div className="col-4 date-holder text-right">
									<div className="icon">
										<i className="icon-clock" />
									</div>
									<div className="date">
										<span>6:00 am</span>
										<span className="text-info">
											6 hours ago
										</span>
									</div>
								</div>
								<div className="col-8 content">
									<h5>Meeting</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Table4;
