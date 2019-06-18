import React, { PureComponent } from "react";
import logo from "../../../../assets/img/avatar-1.jpg";
import logo2 from "../../../../assets/img/avatar-2.jpg";
import logo3 from "../../../../assets/img/avatar-3.jpg";

class Table3 extends PureComponent {
	render() {
		return (
			<div className="col-lg-4">
				<div className="box-info card">
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
						<h3 className="h4">Daily Feeds</h3>
					</div>
					<div className="card-body">
						<div className="item">
							<div className="feed d-flex justify-content-between">
								<div className="feed-body d-flex justify-content-between">
									<a className="feed-profile">
										<img
											src={logo}
											alt="person"
											className="img-fluid rounded-circle"
										/>
									</a>
									<div className="content">
										<h5>Aria Smith</h5>
										<span>Posted a new blog </span>
										<div className="full-date">
											<small>
												Today 5:60 pm - 12.06.2014
											</small>
										</div>
									</div>
								</div>
								<div className="date text-right">
									<small>5min ago</small>
								</div>
							</div>
						</div>
						<div className="item">
							<div className="feed d-flex justify-content-between">
								<div className="feed-body d-flex justify-content-between">
									<a className="feed-profile">
										<img
											src={logo2}
											alt="person"
											className="img-fluid rounded-circle"
										/>
									</a>
									<div className="content">
										<h5>Frank Williams</h5>
										<span>Posted a new blog </span>
										<div className="full-date">
											<small>
												Today 5:60 pm - 12.06.2014
											</small>
										</div>
										<div className="CTAs">
											<a className="btn btn-xs btn-secondary">
												<i className="fa fa-thumbs-up"> </i>
												Like
											</a>
											<a className="btn btn-xs btn-secondary">
												<i className="fa fa-heart"> </i>
												Love
											</a>
										</div>
									</div>
								</div>
								<div className="date text-right">
									<small>5min ago</small>
								</div>
							</div>
						</div>
						<div className="item clearfix">
							<div className="feed d-flex justify-content-between">
								<div className="feed-body d-flex justify-content-between">
									<a className="feed-profile">
										<img
											src={logo3}
											alt="person"
											className="img-fluid rounded-circle"
										/>
									</a>
									<div className="content">
										<h5>Ashley Wood</h5>
										<span>Posted a new blog </span>
										<div className="full-date">
											<small>
												Today 5:60 pm - 12.06.2014
											</small>
										</div>
									</div>
								</div>
								<div className="date text-right">
									<small>5min ago</small>
								</div>
							</div>
							<div className="quote has-shadow">
								<small>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Over the years.
								</small>
							</div>
							<div className="CTAs pull-right">
								<a className="btn btn-xs btn-secondary">
									<i className="fa fa-thumbs-up"> </i>Like
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Table3;
