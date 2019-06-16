import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { List } from 'immutable';

import { AutoSizer, Column, Table } from 'react-virtualized';

class EmployeeList extends Component {

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
                                headerHeight={ 0 }
                                rowHeight={ 40 }
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
                                    label="Members"
                                    dataKey='name'
                                    cellRenderer={
                                            ({ rowData }) => {
                                                return (
                                                    <div className="item d-flex align-items-center">
                                                        <div className="text">
                                                            <a><h3 className="h5 text-uppercase">{rowData.get('last_name')}, {rowData.get('first_name')} {rowData.get('middle_name')} {rowData.get('suffix')} </h3></a>
                                                        </div>
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

export default withRouter(connect(mapPropsToState)(EmployeeList))

