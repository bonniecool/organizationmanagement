import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { _ } from 'app/Utils';
import img_thumbnail from 'assets/img/image-thumbnail.jpg';
import { AutoSizer, Column, Table } from 'react-virtualized';

class ClientList extends Component {

    state = {
        selectedIndex: 0,
    }

    onSelectRow = ({index,rowData}) => {
        if(this.props.onSelectRow){
            this.props.onSelectRow(rowData)
        }
        this.setState({
            selectedIndex:index
        })
    }


	render() {

		const { loadingTypes, data } = this.props

		return (

		<AutoSizer disableHeight>
				{ ({ width }) => {
						return (
								<Table
										width={ width }
										height={ 620 }
										headerHeight={ 40 }
										rowHeight={ 60 }
										rowCount={ data.size }
										onRowClick={this.onSelectRow}
										rowClassName={
												({index}) => {
														if(index === -1)
																return "table-row-header"
														return( index % 2 === 0) ? `table-row-even table-overflow ${(`${index}` === `${this.state.selectedIndex}`) ? "active" : ""}` :
														`table-row-odd table-overflow ${(`${index }`=== `${this.state.selectedIndex}`) ? "active" : ""}`
												}
										}

										noRowsRenderer={() => {
												return (
														<div>
																{
																		loadingTypes.indexOf('DISPATCH_GET_DEPARTMENT_SERVICE_DIVISION_LIST') > -1 ?
																		<div className="text-center" style={{marginTop:240}}>
																				<i className="fa fa-spin fa-spinner" /> Loading...
																		</div>
																		:
																		<div className="text-center no-content">
																				<div className="title">No Record Found</div>
																		</div>
																}
														</div>
												)
										}}

										rowGetter={({index}) => data.get(index)}>

										<Column
												width={ width }
												label="Client"
												dataKey='name'
												cellRenderer={
																({ cellData, rowData, rowIndex }) => {
																		return (
																				<div className="item d-flex align-items-center">
																						<div className="image">
																								<img
																										src={ _.isNil(rowData.getIn(['profile','photo'])) || rowData.getIn(['profile','photo']) === '' ? img_thumbnail : rowData.getIn(['profile','photo']) }
																										alt="..."
																										className="img-fluid rounded-circle"
																								/>
																						</div>
																						<div className="text">
																								<a><h3 className="h5 text-uppercase">{rowData.getIn(['profile','last_name'])} {rowData.getIn(['profile','first_name'])} {rowData.getIn(['profile','middle_name'])} </h3></a>
																								<small>{ rowData.get('email') }</small>
																						</div>
																				</div>
																		)
																}
														}

										/>

										<Column
												width={ width }
												label="Status"
												dataKey='name'
												cellRenderer={
																({ cellData, rowData, rowIndex }) => {
																		return (
																				<div className="">
																				{rowData.get('status')}
																				</div>
																		)
																}
														}

										/>

										<Column
												width={ width }
												label="Total Employees"
												dataKey='name'
												cellRenderer={
																({ cellData, rowData, rowIndex }) => {
																		return (
																				<div className="">
																				{rowData.get('total_employees')}
																				</div>
																		)
																}
														}

										/>

										<Column
												width={ width }
												label="Active Employees"
												dataKey='name'
												cellRenderer={
																({ cellData, rowData, rowIndex }) => {
																		return (
																				<div className="">
																				{rowData.getIn(['employees','active','count'])}
																				</div>
																		)
																}
														}

										/>

										<Column
												width={ width }
												label="InActive Employees"
												dataKey='name'
												cellRenderer={
																({ cellData, rowData, rowIndex }) => {
																		return (
																				<div className="">
																				{rowData.getIn(['employees','inactive','count'])}
																				</div>
																		)
																}
														}

										/>

								</Table>
						)
				}}
		</AutoSizer>

		);
	}
}


const mapPropsToState = (state, routeParams) => {

	const { loadingTypes } = state.loading;

	return{
		loadingTypes,
	};

};

export default withRouter(connect(mapPropsToState)(ClientList))

