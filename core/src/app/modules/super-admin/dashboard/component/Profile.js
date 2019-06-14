import React, { PureComponent } from "react";
import logo from "../../../../assets/img/avatar-1.jpg";

class Profile extends PureComponent {
	render() {
		return (
			<div className="col-lg-4">
				<div className="client card">
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
					<div className="card-body text-center">
						<div className="client-avatar">
							<img
								src={logo}
								alt="..."
								className="img-fluid rounded-circle"
							/>
							<div className="status bg-green" />
						</div>
						<div className="client-title">
							<h3>Jason Doe</h3>
							<span>Web Developer</span>
							<a>Follow</a>
						</div>
						<div className="client-info">
							<div className="row">
								<div className="col-4">
									<strong>20</strong>
									<br />
									<small>Photos</small>
								</div>
								<div className="col-4">
									<strong>54</strong>
									<br />
									<small>Videos</small>
								</div>
								<div className="col-4">
									<strong>235</strong>
									<br />
									<small>Tasks</small>
								</div>
							</div>
						</div>
						<div className="client-social d-flex justify-content-between">
							<a target="_blank">
								<i className="fa fa-facebook" />
							</a>
							<a target="_blank">
								<i className="fa fa-twitter" />
							</a>
							<a target="_blank">
								<i className="fa fa-google-plus" />
							</a>
							<a target="_blank">
								<i className="fa fa-instagram" />
							</a>
							<a target="_blank">
								<i className="fa fa-linkedin" />
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
