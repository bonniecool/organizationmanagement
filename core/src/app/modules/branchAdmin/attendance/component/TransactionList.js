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
            <th width="20%">
              <div className="mt-3">
                Reference No.
              </div>
            </th>
            <th width="20%">
              <div className="mt-3">
                Organization
              </div>
            </th>
            <th width="20%">
              <div className="mt-3">
                Amount
              </div>
            </th>
            <th width="40px">
              <div className="mt-3">
                Status
              </div>
            </th>
            <th width="20%">
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
                  <th><small>{_.get(item,'amount')}</small></th>
                  <td><small>{_.get(item,'status')}</small></td>
                  <td><small>{_.get(item,'remarks')}</small></td>
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
