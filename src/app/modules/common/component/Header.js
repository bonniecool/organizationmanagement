import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logo from 'assets/img/logo-white.png';
import Modal from 'app/modules/common/component/Modal';

class Header extends PureComponent {

	state = {
		isSearch: false
	}

	handleLogout = (e) => {
		e.preventDefault();
		const { dispatch } = this.props
		dispatch({
			type: 'MODAL',
			data:{
				isOpen: true,
				title: 'Are you sure you want to log out?',
				content: (
					<div>
						<Modal.Footer>
							<button onClick={() => {
                            dispatch({
                                type: "SIGN_OUT",
                                })
                            }}
                            className="btn btn-md btn-danger">LOG OUT</button>
                        <button onClick={() => {
                            dispatch({
                                type: 'MODAL',
                                data : {
                                    isOpen: false,
                                }
                            })
                        }} 
                        className="btn btn-md btn-secondary">CANCEL</button>
						</Modal.Footer>
					</div>
				)
			}
		})
	}

	handleToggle = (e) => {
		const { isShinked, dispatch } = this.props;
		dispatch({
			type: 'GET_NAV_SIZE',
			data: !isShinked
		})
	}

	handleClose = (e) => {
		e.preventDefault();
		this.setState({isSearch: false})
	}

	render() {
		const { isShinked, user_type } = this.props;
		return (
			<header className="header fixed-top"> 
				<nav className={`navbar bg-${user_type > 0 ? 'danger':'primary'}-gradient`}>
					<div style={{display: this.state.isSearch ? 'block' : 'none'}}
						className="search-box">
						<button 
							onClick={this.handleClose}
							className="dismiss">
							<i className="fa fa-times" />
						</button>
						<form id="searchForm" action="#" role="search">
							<input
								type="search"
								placeholder="What are you looking for..."
								className="form-control"
							/>
						</form>
					</div>
					<div className="container-fluid mx-2">
						<div className="navbar-holder d-flex align-items-center justify-content-between">
							<div className="navbar-header">
								<a className="navbar-brand">
					                <div style={{display: !isShinked ? 'block' : 'none'}}
					                	className="brand-text brand-big hidden-lg-down">
					                	<img className="logo-wrapper mr-2" src={ logo } alt="PHIS" />
					                	<b onClick={this.handleToggle} >Philippine Human Resources Information System</b>
					                </div>
					               	<div style={{display: isShinked ? 'block' : 'none'}}
					               		className="brand-text brand-small">
					               		<img className="logo-wrapper mr-2" src={ logo } alt="PHISM" />
					               		<strong onClick={this.handleToggle} >PHRISM</strong>
					               	</div>
				               	</a>
				               	<a onClick={this.handleToggle}
				               		id="toggle-btn" 
				               		className={`menu-btn ${!isShinked && 'active'}`}>
				               		<span></span><span></span><span></span>
				               	</a>
				            </div>
				            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
				            	{/*<li className="nav-item d-flex align-items-center">
				            		<a onClick={() => this.setState({isSearch: true})}
				            			id="search">
				            			<i className="fa fa-search"></i>
				            		</a>
				            	</li>*/}
				            	{/*<li className="nav-item dropdown"> 
				            		<a id="notifications" 
				            			rel="nofollow" 
				            			data-target="#" 
				            			data-toggle="dropdown" 
				            			aria-haspopup="true" 
				            			aria-expanded="false" 
				            			className="nav-link">
				            			<i className="fa fa-bell-o" />
				            			<span className="badge bg-red">0</span>
				            		</a>
                  					<ul aria-labelledby="notifications" className="dropdown-menu">
                  						<li>
                  							<a rel="nofollow" className="dropdown-item"> 
                        						<div className="notification">
	                          						<div className="notification-content">
	                          							<i className="fa fa-envelope bg-green"></i>
	                          							You have 6 new messages 
	                          						</div>
	                          						<div className="notification-time">
	                          							<small>4 minutes ago</small>
	                          						</div>
                        						</div>
                        					</a>
                        				</li>
                        				<li>
                        					<a rel="nofollow" className="dropdown-item"> 
                        						<div className="notification">
                          							<div className="notification-content">
                          								<i className="fa fa-twitter bg-blue"></i>
                          								You have 2 followers
                          							</div>
                          							<div className="notification-time">
                          								<small>4 minutes ago</small>
                          							</div>
                        						</div>
                        					</a>
                        				</li>
                        				<li>
                        					<a rel="nofollow" className="dropdown-item"> 
					                        	<div className="notification">
					                          		<div className="notification-content">
					                          			<i className="fa fa-upload bg-orange"/>
					                          			Server Rebooted
					                          		</div>
					                          		<div className="notification-time">
					                          			<small>4 minutes ago</small>
					                          		</div>
					                        	</div>
					                        </a>
					                    </li>
					                    <li>
					                    	<a rel="nofollow" className="dropdown-item"> 
					                        	<div className="notification">
					                          		<div className="notification-content">
					                          			<i className="fa fa-twitter bg-blue"/>
					                          			You have 2 followers
					                          		</div>
						                          	<div className="notification-time">
						                          		<small>10 minutes ago</small>
						                          	</div>
						                        </div>
					                        </a>
					                    </li>
					                    <li>
					                    	<a rel="nofollow" className="dropdown-item all-notifications text-center"> 
					                    	<strong>view all notifications</strong>
					                    	</a>
					                    </li>
                  					</ul>
                				</li>
                				<li className="nav-item dropdown"> 
                					<a id="messages" 
                						rel="nofollow" 
                						data-target="#" 
                						data-toggle="dropdown" 
                						aria-haspopup="true" 
                						aria-expanded="false" 
                						className="nav-link">
                						<i className="fa fa-envelope-o"/>
                						<span className="badge bg-orange">0</span>
                					</a>
                					<ul aria-labelledby="notifications" 
                						className="dropdown-menu">
                						<li>
	                						<a rel="nofollow" 
	                							className="dropdown-item d-flex"> 
	                        					<div className="msg-profile"> 
	                        						<img src="img/avatar-1.jpg" 
	                        							alt="..." 
	                        							className="img-fluid rounded-circle" />
	                        					</div>
	                        					<div className="msg-body">
	                          						<h3 className="h5">Jason Doe</h3>
	                          						<span>Sent You Message</span>
	                        					</div>
	                        				</a>
                        				</li>
                        				<li>
                        					<a rel="nofollow" 
                        						className="dropdown-item d-flex"> 
	                        					<div className="msg-profile"> 
	                        						<img src="img/avatar-2.jpg" alt="..." className="img-fluid rounded-circle" />
	                        					</div>
					                        	<div className="msg-body">
					                          		<h3 className="h5">Frank Williams</h3>
					                          		<span>Sent You Message</span>
					                        	</div>
					                        </a>
                        				</li>
                        				<li>
                        					<a rel="nofollow" 
                        						className="dropdown-item d-flex"> 
                        						<div className="msg-profile"> 
                        							<img src="img/avatar-3.jpg" 
                        								alt="..." 
                        								className="img-fluid rounded-circle" />
                        						</div>
	                        					<div className="msg-body">
	                          						<h3 className="h5">Ashley Wood</h3><span>Sent You Message</span>
	                        					</div>
                        					</a>
                        				</li>
                					</ul>
                				</li>*/}
                				<li className="nav-item">
                					<a onClick={this.handleLogout}
                						className="logout btn-outline-secondary btn-sm  btn mt-1 mr-3 ml-2">
                						Logout
                						<i className="fa fa-sign-out"/>
                					</a>
                				</li>
				            </ul>
						</div>
					</div>
				</nav>
			</header>
		);
	}
}

const mapStateToProps = (state, routeParams) => {
	const { isShinked } = state.nav.toJS();
	const { auth } = state
    return {
        isShinked,
        user_type: auth.get('user_type')
    };
};

export default withRouter(connect(mapStateToProps)(Header));

