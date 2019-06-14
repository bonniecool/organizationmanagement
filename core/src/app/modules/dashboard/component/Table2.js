import React, { PureComponent } from "react";

class Table2 extends PureComponent {
	render() {
		return (
			<div className="col-lg-4">
				<div className="recent-updates card">
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
									<i className="fa fa-gear" /> Edit
								</a>
							</div>
						</div>
					</div>
					<div className="card-header">
						<h3 className="h4">Recent Updates</h3>
					</div>
					<div className="card-body">
						<div className="item d-flex justify-content-between">
							<div className="info d-flex">
								<div className="icon">
									<i className="icon-rss-feed" />
								</div>
								<div className="title">
									<h5>Lorem ipsum dolor sit amet.</h5>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit sed.
									</p>
								</div>
							</div>
							<div className="date text-right">
								<strong>24</strong>
								<span>May</span>
							</div>
						</div>
						<div className="item d-flex justify-content-between">
							<div className="info d-flex">
								<div className="icon">
									<i className="icon-rss-feed" />
								</div>
								<div className="title">
									<h5>Lorem ipsum dolor sit amet.</h5>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit sed.
									</p>
								</div>
							</div>
							<div className="date text-right">
								<strong>24</strong><span>May</span>
							</div>
						</div>
						<div className="item d-flex justify-content-between">
							<div className="info d-flex">
								<div className="icon">
									<i className="icon-rss-feed" />
								</div>
								<div className="title">
									<h5>Lorem ipsum dolor sit amet.</h5>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit sed.
									</p>
								</div>
							</div>
							<div className="date text-right">
								<strong>24</strong><span>May</span>
							</div>
						</div>
						<div className="item d-flex justify-content-between">
							<div className="info d-flex">
								<div className="icon">
									<i className="icon-rss-feed" />
								</div>
								<div className="title">
									<h5>Lorem ipsum dolor sit amet.</h5>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit sed.
									</p>
								</div>
							</div>
							<div className="date text-right">
								<strong>24</strong><span>May</span>
							</div>
						</div>
						<div className="item d-flex justify-content-between">
							<div className="info d-flex">
								<div className="icon">
									<i className="icon-rss-feed" />
								</div>
								<div className="title">
									<h5>Lorem ipsum dolor sit amet.</h5>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit sed.
									</p>
								</div>
							</div>
							<div className="date text-right">
								<strong>24</strong><span>May</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Table2;
