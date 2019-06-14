import React, { PureComponent } from 'react';

class Progress extends PureComponent{

	render(){
		return(
			<section className="dashboard-counts no-padding-bottom">
            	<div className="container-fluid">
              		<div className="row bg-white has-shadow">
                		<div className="col-xl-3 col-sm-6">
                  			<div className="item d-flex align-items-center">
                    			<div className="icon bg-violet">
                    				<i className="icon-user"/>
                    			</div>
                    			<div className="title">
                    				  <span>Total <br/> Receivable</span>
                      				<div className="progress">
                        				<div 
                        					role="progressbar" 
                        					style={{width: '25%', height: 4}} 
                        					aria-valuenow="25" 
                        					aria-valuemin="0" 
                        					aria-valuemax="100" 
                        					className="progress-bar bg-violet"></div>
                      				</div>
                    			</div>
                    			<div className="number">
                    				<strong>25</strong>
                    			</div>
                  			</div>
                		</div>
                		<div className="col-xl-3 col-sm-6">
                  			<div className="item d-flex align-items-center">
                    			<div className="icon bg-red">
                    				<i className="icon-padnote" />
                    			</div>
                    			<div className="title">
                    				<span>Total <br/> Receivables</span>
                      				<div className="progress">
                        				<div 
                        					role="progressbar" 
                        					style={{width: '25%', height: 4}} 
                        					aria-valuenow="25" 
                        					aria-valuemin="0" 
                        					aria-valuemax="100" 
                        					className="progress-bar bg-red"></div>
                      				</div>
			                    </div>
                    			<div className="number">
                    				<strong>70</strong>
                    			</div>
                  			</div>
                		</div>
                		<div className="col-xl-3 col-sm-6">
                  			<div className="item d-flex align-items-center">
                    			<div className="icon bg-green"><i className="icon-bill"></i></div>
                    				<div className="title">
                    					<span>Total <br/> Collections</span>
                      					<div className="progress">
                        					<div 
                        						role="progressbar"
                        						style={{width: '25%', height: 4}} 
                        						aria-valuenow="25" 
                        						aria-valuemin="0" 
                        						aria-valuemax="100" 
                        						className="progress-bar bg-green"></div>
                      					</div>
                    				</div>
                    			<div className="number">
                    				<strong>44</strong>
                    			</div>
                  			</div>
                		</div>
                		<div className="col-xl-3 col-sm-6">
                  			<div className="item d-flex align-items-center">
                    			<div className="icon bg-orange">
                    				<i className="icon-check" /> 
                    			</div>
	                    		<div className="title">
	                    			<span>Pending <br/> Payments</span>
	                      			<div className="progress">
	                        			<div 
	                        				role="progressbar" 
	                        				style={{width: '25%', height: 4}} 
	                        				aria-valuenow="25" 
	                        				aria-valuemin="0" 
	                        				aria-valuemax="100" 
	                        				className="progress-bar bg-orange"></div>
	                      			</div>
	                    		</div>
	                    		<div className="number">
	                    			<strong>35</strong>
	                    		</div>
                  			</div>
                		</div>
              		</div>
            	</div>
          </section>
			);
	}
}

export default Progress