import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GeoMap from 'app/modules/chart/GeoMap';
// import { List } from 'immutable';
import * as c from '../constant';
import { AsyncComponent } from 'app/Utils';
import Table from '../component/Table';

// const LineChartMultiple = AsyncComponent(() => import('app/modules/chart/LineChartMultiple'));
// const HorizontalBar = AsyncComponent(() => import('app/modules/chart/HorizontalBar'));
// const Bar = AsyncComponent(() => import('app/modules/chart/Bar'));
// const Pie = AsyncComponent(() => import('app/modules/chart/Pie'));
const Doughnut = AsyncComponent(() => import('app/modules/chart/DoughnutSuper'));
// const Polar = AsyncComponent(() => import('app/modules/chart/Polar'));

const randomInt = (min, max, withFormat = false) =>  {
	const rand = Math.floor(Math.random() * (max - min + 1)) + min;;
	if(withFormat)
		return formatNumber(rand);
  	return rand
}

const formatNumber = (n, minimumFractionDigits = 2, maximumFractionDigits = 2) => {
    return n.toLocaleString('en', { minimumFractionDigits, maximumFractionDigits });
}

class Dashboard extends Component {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_ATTENDEES
		})
	}

	render() {

		const { statistic } = this.props;
		const government_status = statistic.getIn(['agencies','type',0,'status'])
		const private_status = statistic.getIn(['agencies','type',1,'status'])
		const mapData = [
		{
			region_code: '010000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '020000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '030000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '040000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '170000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '050000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '060000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '070000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '080000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '090000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '100000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '110000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '120000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '160000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '130000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '140000000',
			aggregate: randomInt(0, 100)
		},{
			region_code: '150000000',
			aggregate: randomInt(0, 100)
		}
	]
	const color = {background:'#'+(Math.random()*0xFFFFFF<<0).toString(16)};
	const govcolor = {background:'#'+(Math.random()*0xFFFFFF<<0).toString(16)};
	const privatecolor = {background:'#'+(Math.random()*0xFFFFFF<<0).toString(16)};

	console.log(statistic.toJS())
		return (
			<div className="">
				<header className="page-header">
					<div className="container-fluid">
						<h2 className="title-header m-2">Dashboard</h2>
					</div>
				</header>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4">
							<div className="card mt-2">
								<div className="card-body">
									<div className="">
										<div className="d-flex align-items-center">
											<div className="circularIcon-wrapper-big">
												<div className="circularIcon-big" style={color} >
												{statistic.get('departments')}
												</div>
											</div>
											<div style={{'width':'100px', 'height':'100px','zIndex':9}}>
											{
												statistic &&
												<Doughnut
													// height={300}
													data={[statistic.toJS()]}
													index_name="departments"
													index_value="departments"
													/>
											}
											</div>
											<div className="numberItem ml-auto">
											<b>Departments</b>
											</div>
										</div>
										<div className="titleItem mt-2">
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card mt-2">
								<div className="card-body">
									<div className="">
										<div className="d-flex align-items-center">
										
											<div className="circularIcon-wrapper-big">
												<div className="circularIcon-big" style={govcolor} >
													{statistic.getIn(['agencies','type',0,'count'])}
												</div>
											</div>
											<div style={{'width':'100px', 'height':'100px','zIndex':9}}>
											{
												government_status &&
												<Doughnut
													// height={300}
													data={government_status.toJS()}
													index_name="status"
													index_value="count"
													/>
											}
											</div>
											<div className="numberItem ml-auto">
											<b>Government</b>
											</div>
										</div>
										<div className="titleItem mt-2">
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card mt-2">
								<div className="card-body">
									<div className="">



										<div className="d-flex align-items-center">
										
											<div className="circularIcon-wrapper-big">
												<div className="circularIcon-big" style={privatecolor} >
													{statistic.getIn(['agencies','type',1,'count'])}
												</div>
											</div>
											<div style={{'width':'100px', 'height':'100px','zIndex':9}}>
										{
											private_status &&
											<Doughnut
												// height={300}
												data={private_status.toJS()}
												index_name="status"
												index_value="count"
												/>
										}
										</div>
											<div className="numberItem ml-auto">
											<b>Private</b>
											</div>
										</div>
										<div className="titleItem mt-2">
											
										</div>
									</div>
								</div>
							</div>
						</div>
						{
							// statistic.get('active_employees').map((item,key) => {
							// 	const color = {background:'#'+(Math.random()*0xFFFFFF<<0).toString(16)};
							// 	return(
							// 		<div key={`user-${key}`} className="col-md-3 col-sm-4">
							// 			<div className="card mt-2">
							// 				<div className="card-body">
							// 					<div className="">
							// 						<div className="d-flex align-items-center">
							// 							<div className="circularIcon-wrapper">
							// 							<div className="circularIcon" style={color} />
							// 							</div>
							// 							<div className="numberItem ml-auto">
							// 							<b>{item.get('count')}</b>
							// 							</div>
							// 						</div>
							// 						<div className="titleItem mt-2">
							// 							{item.get('status')}
							// 						</div>
							// 					</div>
							// 				</div>
							// 			</div>
							// 		</div>
							// 	)
							// })
						}
					</div>
				</div>

				<section className="">
					<div className="container-fluid">
						<div className="row">
							<div className="col d-flex">
								<div className="list-box card d-flex align-items-stretch" style={{width:"100%"}}>
									<div className="card-header d-flex align-items-center">
										<h2 className="mr-auto">Clients</h2>
									</div>
									<div className="card-body list">
										<div className="row">
											<div className="col">
											{
												statistic &&
												<Table 
													data={statistic.get('agency_list') || [] }
												/>
											}
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</section>
				<section className="">
					<div className="container-fluid">
						<div className="row">
							<div className="col">
								<div className="list-box card">
									<div className="card-header d-flex align-items-center">
										<h2 className="mr-auto">Map</h2>
									</div>
									<div className="card-body list">
										<div className="row">
											<div className="col">
											{
												<GeoMap
													data={ mapData }
												/>
											}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = (state, routeParams) => {
	const dashboardSuperAdmin = state.dashboardSuperAdmin;
	return {
		statistic : dashboardSuperAdmin.get('statistic'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));
