/* eslint-disable */
import React, { PureComponent } from 'react';
import _ from 'lodash';

class TransactionList extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <table className="table table-hover mg-b-0">
        <thead className="pt-2 pb-2">
          <tr>
            <th>
              <div className="col-lg-12 mb-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search for..." />
                  <span className="btn-group btn-group-sm input-group-btn">
                    <button className="btn btn-outline-primary " type="button"><i className="fa fa-search"></i></button>
                  </span>
                </div>
              </div>
              <div className="mt-3">
                Reference No.
              </div>
            </th>
            <th>
              <div className="mt-3">
                Organization
              </div>
            </th>
            <th>
              <div className="mt-3">
                Amount
              </div>
            </th>
            <th>
            <div className="mt-3">
              Status
            </div>
            </th>
            <th>
              <div className="mt-3">
                Transaction Date
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data.map( (item, key) => {
              return(
                <tr key={`key-${key}${item.id}`} >
                  <td><small>{_.get(item,'refno')}</small></td>
                  <th><small>{_.get(item,'organization_name')}</small></th>
                  <td><small>{_.get(item,'amount')}</small></td>
                  <td><small>{_.get(item,'status')}</small></td>
                  <td><small>{_.get(item,'created_date_readable')}</small></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}

export default TransactionList;
