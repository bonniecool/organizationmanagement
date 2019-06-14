import React, { PureComponent } from "react";
import logo from "../../../../assets/img/avatar-1.jpg";
import logo2 from "../../../../assets/img/avatar-2.jpg";
import logo3 from "../../../../assets/img/avatar-3.jpg";
import logo4 from "../../../../assets/img/avatar-4.jpg";
import logo5 from "../../../../assets/img/avatar-5.jpg";

class Table1 extends PureComponent {
	render() {
		return (
			<div className="col-lg-6">
				<div className="list-box card">
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
					<div className="card-header d-flex align-items-center">
						<h2 className="h3">Trending Articles</h2>
						<div className="badge badge-rounded bg-green">4 New</div>
					</div>
					<div className="card-body">
						<div className="item d-flex align-items-center">
							<div className="image">
								<img
									src={logo}
									alt="..."
									className="img-fluid rounded-circle"
								/>
							</div>
							<div className="text">
								<a><h3 className="h5">Lorem Ipsum Dolor</h3></a>
								<small>Posted on 5th June 2017 by Aria Smith.{" "}</small>
							</div>
						</div>
						<div className="item d-flex align-items-center">
							<div className="image">
								<img
									src={logo2}
									alt="..."
									className="img-fluid rounded-circle"
								/>
							</div>
							<div className="text">
								<a><h3 className="h5">Lorem Ipsum Dolor</h3></a>
								<small>Posted on 5th June 2017 by Frank Williams.</small>
							</div>
						</div>
						<div className="item d-flex align-items-center">
							<div className="image">
								<img
									src={logo3}
									alt="..."
									className="img-fluid rounded-circle"
								/>
							</div>
							<div className="text">
								<a><h3 className="h5">Lorem Ipsum Dolor</h3></a>
								<small>Posted on 5th June 2017 by Ashley Wood.{" "}</small>
							</div>
						</div>
						<div className="item d-flex align-items-center">
							<div className="image">
								<img
									src={logo4}
									alt="..."
									className="img-fluid rounded-circle"
								/>
							</div>
							<div className="text">
								<a><h3 className="h5">Lorem Ipsum Dolor</h3></a>
								<small>Posted on 5th June 2017 by Jason Doe.{" "}</small>
							</div>
						</div>
						<div className="item d-flex align-items-center">
							<div className="image">
								<img
									src={logo5}
									alt="..."
									className="img-fluid rounded-circle"
								/>
							</div>
							<div className="text">
								<a><h3 className="h5">Lorem Ipsum Dolor</h3></a>
								<small>Posted on 5th June 2017 by Sam Martinez.</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Table1;