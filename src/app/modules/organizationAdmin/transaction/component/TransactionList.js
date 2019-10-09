/* eslint-disable */
import React, { PureComponent } from 'react';
import _ from 'lodash';

class TransactionList extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <table className="table table-striped table-hover mg-b-0">
        <thead className="pt-2 pb-2">
          <tr>
            <th width="30%">
              <div className="mt-3">
                Reference No.
              </div>
            </th>
            <th >
              <div className="mt-3">
                Organization
              </div>
            </th>
            <th >
              <div className="mt-3">
                Amount
              </div>
            </th>
            <th >
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
                  <td><small>{item.get('refno')}</small></td>
                  <th><small>{item.get('organization_name')}</small></th>
                  <td><small>{item.get('amount')}</small></td>
                  <td><small>{item.get('status')}</small></td>
                  <td><small>{item.get('created_date_readable')}</small></td>
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
